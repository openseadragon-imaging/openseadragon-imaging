import { default as OpenSeadragon } from 'openseadragon';
/**
 * @module openseadragon-viewerinputhook
 * @version __PKG_VERSION__
 * @requires module:openseadragon
 */
/**
 * @file viewerinputhook.ts
 * @version __PKG_VERSION__
 * @author Mark Salsbery <msalsbery@hotmail.com>
 *
 */
declare module 'openseadragon' {
    interface Viewer {
        addViewerInputHook(options?: ViewerInputHookOptions): ViewerInputHook;
    }
    interface MouseTrackerEvent<T> {
        stopHandlers?: boolean;
        stopBubbling?: boolean;
    }
}
type ViewerTrackerName = 'viewer' | 'viewer_outer';
type ViewerTrackers = Record<ViewerTrackerName, OpenSeadragon.MouseTracker | null>;
interface MouseTrackerEventMap {
    preProcessEventHandler: OpenSeadragon.PreProcessMouseTrackerEvent;
    enterHandler: OpenSeadragon.EnterLeaveMouseTrackerEvent;
    exitHandler: OpenSeadragon.EnterLeaveMouseTrackerEvent;
    leaveHandler: OpenSeadragon.EnterLeaveMouseTrackerEvent;
    overHandler: OpenSeadragon.EnterLeaveMouseTrackerEvent;
    outHandler: OpenSeadragon.EnterLeaveMouseTrackerEvent;
    moveHandler: OpenSeadragon.PointerMouseTrackerEvent;
    pressHandler: OpenSeadragon.PointerMouseTrackerEvent;
    releaseHandler: OpenSeadragon.ReleaseMouseTrackerEvent;
    nonPrimaryPressHandler: OpenSeadragon.NonPrimaryPressMouseTrackerEvent;
    nonPrimaryReleaseHandler: OpenSeadragon.NonPrimaryPressMouseTrackerEvent;
    clickHandler: OpenSeadragon.ClickMouseTrackerEvent;
    dblClickHandler: OpenSeadragon.DblClickMouseTrackerEvent;
    contextMenuHandler: OpenSeadragon.ContextMenuMouseTrackerEvent;
    scrollHandler: OpenSeadragon.ScrollMouseTrackerEvent;
    keyDownHandler: OpenSeadragon.KeyMouseTrackerEvent;
    keyUpHandler: OpenSeadragon.KeyMouseTrackerEvent;
    keyHandler: OpenSeadragon.KeyMouseTrackerEvent;
    focusHandler: OpenSeadragon.MouseTrackerEvent<FocusEvent>;
    blurHandler: OpenSeadragon.MouseTrackerEvent<FocusEvent>;
    dragHandler: OpenSeadragon.DragMouseTrackerEvent;
    dragEndHandler: OpenSeadragon.DragEndMouseTrackerEvent;
    pinchHandler: OpenSeadragon.PinchMouseTrackerEvent;
    stopHandler: OpenSeadragon.StopMouseTrackerEvent;
}
type MouseTrackerHandlerName = Extract<keyof OpenSeadragon.MouseTracker, keyof MouseTrackerEventMap>;
type MouseTrackerEventHandler = {
    [K in MouseTrackerHandlerName]: OpenSeadragon.EventHandler<MouseTrackerEventMap[K]>;
}[MouseTrackerHandlerName];
type Hook = {
    [K in MouseTrackerHandlerName]: {
        tracker: OpenSeadragon.MouseTracker;
        handlerName: K;
        origHandler: MouseTrackerEventHandler | null;
        hookHandler: MouseTrackerEventHandler;
    };
}[MouseTrackerHandlerName];
export type OptionsHook = {
    [K in MouseTrackerHandlerName]: {
        tracker: ViewerTrackerName | OpenSeadragon.MouseTracker;
        handler: K;
        hookHandler: OpenSeadragon.EventHandler<MouseTrackerEventMap[K]>;
    };
}[MouseTrackerHandlerName];
export interface ViewerInputHookOptions {
    viewer?: OpenSeadragon.Viewer;
    hooks?: OptionsHook[];
}
/**
 * @class ViewerInputHook
 * @classdesc Provides hooks into the OpenSeadragon viewer event pipeline.
 * @param {Object} options
 * @param {external:"OpenSeadragon.Viewer"} [options.viewer] - Reference to OpenSeadragon viewer to attach to.
 * @param {Object[]} options.hooks
 */
export default class ViewerInputHook {
    /**
     * ViewerInputHook version.
     * @member {Object} OpenSeadragonImaging.ViewerInputHook.version
     * @static
     * @property {String} versionStr - The version number as a string ('major.minor.revision').
     * @property {Number} major - The major version number.
     * @property {Number} minor - The minor version number.
     * @property {Number} revision - The revision number.
     */
    static version: {
        versionStr: string;
        major: number;
        minor: number;
        revision: number;
    };
    viewer: OpenSeadragon.Viewer | null;
    viewerTrackers: ViewerTrackers;
    hooks: Hook[];
    constructor(options?: ViewerInputHookOptions);
    private _callHandlers;
    destroy(): void;
}
export {};
