using System.Net;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Ai;

public record AiChatMessage(string Role, string Text);

/// <summary>A provider-neutral request. Tools are never offered (tool use disabled by construction).</summary>
public record AiRequest(string System, List<AiChatMessage> Messages, int MaxTokens, JsonObject? JsonSchema = null);

public abstract record AiStreamEvent;
public record AiTextDelta(string Text) : AiStreamEvent;
public record AiUsage(string Model, int InputTokens, int OutputTokens, int CacheReadTokens, int CacheWriteTokens)
{
    public long Total => (long)InputTokens + OutputTokens + CacheReadTokens + CacheWriteTokens;
}
public record AiFinished(string StopReason, AiUsage Usage) : AiStreamEvent;

public record AiCompletion(string Text, string StopReason, AiUsage Usage);

public interface IAiProvider
{
    bool IsConfigured { get; }
    string Model { get; }
    IAsyncEnumerable<AiStreamEvent> Stream(AiRequest request, CancellationToken ct);
}

public static class AiProviderExtensions
{
    public static async Task<AiCompletion> Complete(this IAiProvider p, AiRequest request, CancellationToken ct)
    {
        var sb = new StringBuilder();
        AiFinished? fin = null;
        await foreach (var e in p.Stream(request, ct))
        {
            if (e is AiTextDelta d) sb.Append(d.Text);
            else if (e is AiFinished f) fin = f;
        }
        if (fin is null) throw new AppException(502, "The AI provider ended the response unexpectedly.", "ai_provider_error");
        return new AiCompletion(sb.ToString(), fin.StopReason, fin.Usage);
    }
}

/// <summary>
/// Claude via the Anthropic Messages API (POST /v1/messages, streamed SSE) over a named HttpClient.
/// Adaptive thinking is left at the model default (thinking deltas are discarded), effort is set explicitly,
/// the stable system prompt carries a cache breakpoint, and server-side refusal fallbacks are opted in.
/// </summary>
public class AnthropicProvider(IHttpClientFactory http, AiOptions opt, ILogger<AnthropicProvider> log) : IAiProvider
{
    public const string HttpClientName = "anthropic";
    public bool IsConfigured => opt.IsConfigured;
    public string Model => opt.Model;

    public JsonObject BuildBody(AiRequest r)
    {
        var messages = new JsonArray();
        foreach (var m in r.Messages)
            messages.Add(new JsonObject { ["role"] = m.Role, ["content"] = m.Text });
        var outputConfig = new JsonObject { ["effort"] = opt.Effort };
        if (r.JsonSchema is not null)
            outputConfig["format"] = new JsonObject { ["type"] = "json_schema", ["schema"] = r.JsonSchema.DeepClone() };
        var body = new JsonObject
        {
            ["model"] = opt.Model,
            ["max_tokens"] = r.MaxTokens,
            ["stream"] = true,
            ["system"] = new JsonArray(new JsonObject
            {
                ["type"] = "text", ["text"] = r.System, ["cache_control"] = new JsonObject { ["type"] = "ephemeral" },
            }),
            ["messages"] = messages,
            ["output_config"] = outputConfig,
        };
        if (opt.RefusalFallback) body["fallbacks"] = "default";
        return body;
    }

    public async IAsyncEnumerable<AiStreamEvent> Stream(AiRequest request, [EnumeratorCancellation] CancellationToken ct)
    {
        if (!IsConfigured) throw AiErrors.NotConfigured();
        var client = http.CreateClient(HttpClientName);
        var url = opt.BaseUrl.TrimEnd('/') + "/v1/messages";
        using var msg = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(BuildBody(request).ToJsonString(), Encoding.UTF8, "application/json"),
        };
        msg.Headers.Add("x-api-key", opt.ApiKey);
        msg.Headers.Add("anthropic-version", "2023-06-01");
        if (opt.RefusalFallback) msg.Headers.Add("anthropic-beta", "server-side-fallback-2026-07-01");
        msg.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("text/event-stream"));

        HttpResponseMessage resp;
        try
        {
            resp = await client.SendAsync(msg, HttpCompletionOption.ResponseHeadersRead, ct);
        }
        catch (HttpRequestException ex)
        {
            log.LogWarning(ex, "AI provider unreachable");
            throw new AppException(503, "The AI service is temporarily unavailable. Please try again later.", "ai_unavailable");
        }
        using (resp)
        {
            if (!resp.IsSuccessStatusCode)
            {
                var errBody = await resp.Content.ReadAsStringAsync(ct);
                log.LogWarning("AI provider returned {Status}: {Body}", (int)resp.StatusCode, errBody.Length > 500 ? errBody[..500] : errBody);
                throw resp.StatusCode is HttpStatusCode.TooManyRequests or HttpStatusCode.ServiceUnavailable
                    or HttpStatusCode.InternalServerError or HttpStatusCode.BadGateway or (HttpStatusCode)529
                    ? new AppException(503, "The AI service is temporarily unavailable. Please try again later.", "ai_unavailable")
                    : new AppException(502, "The AI provider rejected the request.", "ai_provider_error");
            }

            await using var stream = await resp.Content.ReadAsStreamAsync(ct);
            using var reader = new StreamReader(stream, Encoding.UTF8);
            string model = opt.Model, stop = "end_turn";
            int input = 0, output = 0, cacheRead = 0, cacheWrite = 0;
            var textBlocks = new HashSet<int>();
            var finished = false;
            while (!finished && await reader.ReadLineAsync(ct) is { } line)
            {
                if (!line.StartsWith("data:", StringComparison.Ordinal)) continue;
                var data = line[5..].Trim();
                if (data.Length == 0) continue;
                JsonNode? node;
                try { node = JsonNode.Parse(data); } catch (JsonException) { continue; }
                switch ((string?)node?["type"])
                {
                    case "message_start":
                        var m = node!["message"];
                        model = (string?)m?["model"] ?? model;
                        var u = m?["usage"];
                        input = (int?)u?["input_tokens"] ?? 0;
                        cacheRead = (int?)u?["cache_read_input_tokens"] ?? 0;
                        cacheWrite = (int?)u?["cache_creation_input_tokens"] ?? 0;
                        output = (int?)u?["output_tokens"] ?? 0;
                        break;
                    case "content_block_start":
                        if ((string?)node!["content_block"]?["type"] == "text") textBlocks.Add((int?)node["index"] ?? -1);
                        break;
                    case "content_block_delta":
                        var delta = node!["delta"];
                        if ((string?)delta?["type"] == "text_delta" && textBlocks.Contains((int?)node["index"] ?? -1)
                            && (string?)delta["text"] is { Length: > 0 } t)
                            yield return new AiTextDelta(t);
                        break;
                    case "message_delta":
                        stop = (string?)node!["delta"]?["stop_reason"] ?? stop;
                        var du = node["usage"];
                        if (du is not null)
                        {
                            output = (int?)du["output_tokens"] ?? output;
                            input = (int?)du["input_tokens"] ?? input;
                            cacheRead = (int?)du["cache_read_input_tokens"] ?? cacheRead;
                            cacheWrite = (int?)du["cache_creation_input_tokens"] ?? cacheWrite;
                        }
                        break;
                    case "message_stop":
                        finished = true;
                        break;
                    case "error":
                        log.LogWarning("AI provider stream error: {Data}", data.Length > 500 ? data[..500] : data);
                        throw new AppException(503, "The AI service failed while answering. Please try again.", "ai_unavailable");
                }
            }
            if (!finished) throw new AppException(502, "The AI provider ended the response unexpectedly.", "ai_provider_error");
            yield return new AiFinished(stop, new AiUsage(model, input, output, cacheRead, cacheWrite));
        }
    }
}

public static class AiErrors
{
    public static AppException NotConfigured() =>
        new(503, "AI assistance is not configured on this server.", "ai_not_configured");
}
