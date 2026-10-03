namespace Mastemy.Api.Modules.Video;

public class VideoProviderRegistry
{
    private readonly Dictionary<string, IVideoProvider> _providers;

    public VideoProviderRegistry(IEnumerable<IVideoProvider> providers)
    {
        _providers = providers.ToDictionary(p => p.ProviderKey, StringComparer.OrdinalIgnoreCase);
    }

    public IVideoProvider GetProvider(string providerKey)
        => _providers.TryGetValue(providerKey, out var provider)
            ? provider
            : throw new KeyNotFoundException($"No video provider registered for key '{providerKey}'.");

    public IVideoProvider? TryGetProvider(string providerKey)
        => _providers.GetValueOrDefault(providerKey);

    public IReadOnlyCollection<string> RegisteredKeys => _providers.Keys;
}
