/* @openseadragon-imaging/openseadragon-viewerinputhook 3.0.0 9dece33 (clean)  @license MIT */
import e from "openseadragon";
//#region src/openseadragon-viewerinputhook.ts
e.Viewer.prototype.addViewerInputHook = function(e) {
	return e ||= {}, e.viewer = this, new t(e);
};
var t = class {
	static {
		this.version = {
			versionStr: "3.0.0",
			major: 3,
			minor: 0,
			revision: 0
		};
	}
	constructor(t) {
		if (!e.version || e.version.major < 3) throw Error("OpenSeadragonImaging ViewerInputHook requires OpenSeadragon version 3.0.0+");
		if (t ||= {}, t.hooks = t.hooks || [], this.viewer = t.viewer || null, this.viewerTrackers = {}, this.hooks = [], this.viewer) {
			let e = this.viewer;
			this.viewerTrackers.viewer = e.innerTracker || null, this.viewerTrackers.viewer_outer = e.outerTracker || null;
		}
		for (let e of t.hooks) {
			let t;
			if (typeof e.tracker == "string") {
				let n = e.tracker;
				if (!this.viewer) throw Error("A viewer must be specified.");
				if (t = this.viewerTrackers[n], t === void 0) throw Error("Unknown tracker specified: " + e.tracker);
			} else t = e.tracker;
			let n = e.handler;
			t && (this.hooks.push({
				tracker: t,
				handlerName: n,
				origHandler: t[n],
				hookHandler: e.hookHandler
			}), (function(e, t, n, r) {
				let i = t[n];
				t[n] = function(t) {
					return e._callHandlers(r, i, t);
				};
			})(this, t, n, e.hookHandler));
		}
	}
	_callHandlers(e, t, n) {
		if (e(n), t && !n.stopHandlers && t(n), n.stopBubbling && n.originalEvent) {
			let e = n.originalEvent;
			typeof e.stopPropagation == "function" && e.stopPropagation();
		}
	}
	destroy() {
		for (; this.hooks.length > 0;) {
			let e = this.hooks.pop();
			e && (e.tracker[e.handlerName] = e.origHandler);
		}
		this.viewer &&= (this.viewerTrackers = {}, null);
	}
};
//#endregion
export { t as default };

//# sourceMappingURL=openseadragon-viewerinputhook.js.map