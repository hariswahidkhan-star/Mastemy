//#region src/lib/youtube.ts
var YT_STATE = {
	ENDED: 0,
	PLAYING: 1,
	PAUSED: 2
};
var loader = null;
/** Loads https://www.youtube.com/iframe_api exactly once and resolves with the YT namespace. */
function loadYouTubeApi() {
	if (window.YT?.Player) return Promise.resolve(window.YT);
	if (loader) return loader;
	loader = new Promise((resolve, reject) => {
		const previous = window.onYouTubeIframeAPIReady;
		window.onYouTubeIframeAPIReady = () => {
			previous?.();
			if (window.YT) resolve(window.YT);
		};
		if (!document.querySelector("script[src=\"https://www.youtube.com/iframe_api\"]")) {
			const s = document.createElement("script");
			s.src = "https://www.youtube.com/iframe_api";
			s.async = true;
			s.onerror = () => {
				loader = null;
				reject(/* @__PURE__ */ new Error("youtube_api_load_failed"));
			};
			document.head.appendChild(s);
		}
	});
	return loader;
}
/** Player error codes documented by the IFrame API mapped to i18n keys. */
function playerErrorKey(code) {
	switch (code) {
		case 2: return "player.error2";
		case 5: return "player.error5";
		case 100: return "player.error100";
		case 101:
		case 150: return "player.error150";
		case 153: return "player.error153";
		default: return "player.errorUnknown";
	}
}
function youtubeWatchUrl(videoId, startSeconds) {
	const t = startSeconds && startSeconds > 0 ? `&t=${Math.floor(startSeconds)}s` : "";
	return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}${t}`;
}
//#endregion
export { youtubeWatchUrl as i, loadYouTubeApi as n, playerErrorKey as r, YT_STATE as t };

//# sourceMappingURL=youtube-CfgiWCkO.js.map