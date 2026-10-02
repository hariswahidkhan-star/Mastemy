namespace Mastemy.Api.Modules.Questions;

/// <summary>
/// Commits queued (large) question imports one batch at a time. Each batch is applied in a single transaction by
/// <see cref="QuestionImportService.ProcessNextQueued"/>, so a failure imports nothing. Jobs are claimed with a conditional
/// update, so several API instances never process the same batch. Poll interval: Questions:ImportWorkerPollSeconds (default 2).
/// </summary>
public class QuestionImportWorker(IServiceScopeFactory scopes, IConfiguration cfg, ILogger<QuestionImportWorker> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var interval = TimeSpan.FromSeconds(Math.Clamp(cfg.GetValue("Questions:ImportWorkerPollSeconds", 2), 1, 300));
        var requeued = false;
        using var timer = new PeriodicTimer(interval);
        try
        {
            do
            {
                try
                {
                    using var scope = scopes.CreateScope();
                    var svc = scope.ServiceProvider.GetRequiredService<QuestionImportService>();
                    if (!requeued) { await svc.RequeueAbandoned(stoppingToken); requeued = true; }
                    for (var i = 0; i < 10 && await svc.ProcessNextQueued(stoppingToken); i++) { }
                }
                catch (Exception ex) when (ex is not OperationCanceledException) { log.LogDebug(ex, "Question import worker iteration failed"); }
            } while (await timer.WaitForNextTickAsync(stoppingToken));
        }
        catch (OperationCanceledException) { }
    }
}
