import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import OpenSeadragon from 'openseadragon';
import osdNavImages from '../../common/osdnavimages';

export const Route = createFileRoute('/devtests/mousetracker')({
  component: MouseTrackerComponent,
});

const ElementIds = {
  OSDVIEWER: 'seadragon-viewer',
};

// const tileSources = {
//   Image: {
//     xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
//     Url: '//openseadragon.github.io/example-images/duomo/duomo_files/',
//     Format: 'jpg',
//     Overlap: '2',
//     TileSize: '256',
//     Size: {
//       Width: '13920',
//       Height: '10200'
//     }
//   }
// };
const tileSourcesPrefix = '/dzimages/';
const tileSources = [
  // tileSourcesPrefix + 'duomo.dzi',
  // tileSourcesPrefix + 'testpattern.dzi',
  // tileSourcesPrefix + 'tall.dzi',
  // tileSourcesPrefix + 'wide.dzi',
  new OpenSeadragon.LegacyTileSource([
    {
      url: tileSourcesPrefix + 'dog_radiograph_2.jpg',
      width: 1909,
      height: 1331,
    },
  ]),
  // tileSourcesPrefix + 'cannon.xml',
  // tileSourcesPrefix + 'highsmith.dzi',
  // tileSourcesPrefix + '6a32487.dzi',
];

function useOsdViewer() {
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);

  const [isOverlay1Selected, setIsOverlay1Selected] = useState(false);

  useEffect(() => {
    const viewer = OpenSeadragon({
      //------------------
      id: ElementIds.OSDVIEWER,
      // element: ,
      drawer: 'webgl', //"webgl" | "auto" | "html" | "canvas"
      // prefixUrl: '', //'//openseadragon.github.io/openseadragon/images/', // default '/images/'
      prefixUrl: '', //'./lib/openseadragon/images/', // default '/images/'
      navImages: osdNavImages,
      tileSources: tileSources, // default null
      //------------------
      // debugMode: true, // default false
      // useCanvas: true, // default true
      // autoResize: true, //default true  If false, we have to handle resizing of the viewer
      // preserveImageSizeOnResize: true, // default false  autoResize must be true to use this
      // blendTime: 0, // default 0
      // alwaysBlend: false, // default false
      // springStiffness: 6.5, // default 6.5
      // animationTime: 1.2, // default 1.2
      // immediateRender: true, // default false
      // wrapHorizontal: true,
      // visibilityRatio: 0.1, // default 0.5
      // defaultZoomLevel: 0, // default 0
      // minZoomLevel: 0.001, // default null
      // maxZoomLevel: 10, // default null
      // zoomPerClick: 4.2, // default 2.0
      // zoomPerScroll: 1.2, // default 1.2
      // zoomPerSecond: 1.2, // default 1.0
      minZoomImageRatio: 0.5, //0, // default 0.9
      maxZoomPixelRatio: 10, //Infinity, // default 1.1
      // imageSmoothingEnabled: false, // default true
      // smoothTileEdgesMinZoom: Infinity, // default 1.1, infinity turns it off
      //------------------
      // sequenceMode: true, // default false
      // initialPage: 3, // default 0
      // preserveViewport: true, // default false
      // preserveOverlays: true, // default false
      //------------------
      // collectionMode: true, // default false
      // collectionRows: 2, // default 3
      // collectionColumns: 2, // default 0
      // collectionLayout: 'vertical', // default 'horizontal'
      // collectionTileSize: 800, // default 800
      // collectionTileMargin: 80, // default 80
      //------------------
      // gestureSettingsMouse: {
      //   flickEnabled: true
      // },
      // gestureSettingsTouch: {
      // 	pinchRotate: true
      // },
      //------------------
      // showNavigationControl: false, // default true
      // navigationControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT, // default TOP_LEFT
      // showZoomControl: false, // default true
      // showHomeControl: false, // default true
      // showFullPageControl: false, // default true
      // showRotationControl: true, // default false
      // showFlipControl: true, // default false
      // showSequenceControl: false, // default true if sequenceMode true
      // sequenceControlAnchor: OpenSeadragon.ControlAnchor.TOP_RIGHT, // default TOP_LEFT
      // navPrevNextWrap: true, // default false
      //------------------
      // showNavigator: true, // default false
      // navigatorElement: null, // default null
      // navigatorId: 'navigatorDiv1', // default 'navigator-' + GENERATED DATE
      // navigatorPosition: 'BOTTOM_RIGHT', // default 'TOP_RIGHT'
      // navigatorSizeRatio: 0.3, // default 0.2
      // navigatorMaintainSizeRatio: true, // default false
      // navigatorTop: 0, // string | number | undefined
      // navigatorLeft: 0, // string | number | undefined
      // navigatorHeight: 0, // string | number | undefined
      // navigatorWidth: 0, // string | number | undefined
      // navigatorAutoResize: false, // default true
      // navigatorAutoFade: false, // default true
      // navigatorRotate: false, // default true
      // navigatorBackground: '#000', // default '#000'
      // navigatorOpacity: 0.8, // default 0.8
      // navigatorBorderColor: '#555', // default '#555'
      //------------------
      // showReferenceStrip: true, // default false
      // referenceStripElement: null, // default null
      // referenceStripId: null, // default null
      // referenceStripScroll: 'vertical', // default 'horizontal'
      // referenceStripPosition: 'BOTTOM_LEFT', // default 'BOTTOM_LEFT'
      // referenceStripSizeRatio: 0.2, // default 0.2
      // referenceStripMaintainSizeRatio: true, // default false
      // referenceStripTop: null, // default null
      // referenceStripLeft: null, // default null
      // referenceStripHeight: null, // default null
      // referenceStripWidth: null, // default null
      // referenceStripAutoResize: true, // default true
      // referenceStripAutoHide: true, // default true
      // referenceStripAutoHideFactor: 0.5, // default 0.5
      // referenceStripAutoFade: false, // default true
      // referenceStripBackground: '#000', // default '#000'
      // referenceStripOpacity: 0.8, // default 0.8
      // referenceStripBorderColor: '#555', // default '#555'
      //------------------
      overlays: [
        {
          id: 'overlay1',
          x: 0.05,
          y: 0.05,
          // px: 100,
          // py: 100
        },
        {
          id: 'overlay2',
          x: 0.35,
          y: 0.05,
          // px: 100,
          // py: 600
        },
        {
          id: 'overlay3',
          x: 0.58,
          y: 0.05,
          // px: 100,
          // py: 1100
        },
      ],
      //------------------
    });

    //***********************************************************************
    // viewer.addHandler('webgl-context-recovered', (event) => {
    //   console.log('Viewer open event');
    // });
    //***********************************************************************

    viewer.addHandler('open', (/*event*/) => {
      console.log('Viewer open event');
    });

    const mouseTracker1 = new OpenSeadragon.MouseTracker({
      userData: 'overlay1.Tracker',
      element: overlay1Ref.current || '', //'overlay1',
      preProcessEventHandler: function (eventInfo) {
        const target = eventInfo.originalEvent.target;
        switch (eventInfo.eventType) {
          case 'pointerdown':
          case 'pointerup':
          case 'pointermove':
            // prevent pointerdown/pointerup events from bubbling
            // viewer won't see these events
            eventInfo.stopPropagation = true;
            if (target instanceof Element && target.nodeName === 'A') {
              // allow user agent to handle clicks
              eventInfo.preventDefault = false;
              // prevents clickHandler call
              eventInfo.preventGesture = true;
            }
            break;
          case 'click':
            // prevent click event from bubbling
            eventInfo.stopPropagation = true;
            if (target instanceof Element && target.nodeName === 'A') {
              // allow user agent to handle clicks
              eventInfo.preventDefault = false;
            } else {
              // we'll handle clicks
              eventInfo.preventDefault = true;
            }
            break;
          case 'contextmenu':
            // allow context menu to pop up
            eventInfo.stopPropagation = true;
            eventInfo.preventDefault = false;
            break;
          default:
            break;
        }
      },
      clickHandler: function (/*event*/) {
        // OpenSeadragon.console.log('*** clickHandler ***');
        setIsOverlay1Selected((wasSelected) => {
          return !wasSelected;
        });
      },
    });

    const mouseTracker2 = new OpenSeadragon.MouseTracker({
      userData: 'overlay2.Tracker',
      element: overlay2Ref.current || '', //'overlay2',
      preProcessEventHandler: function (eventInfo) {
        switch (eventInfo.eventType) {
          case 'pointerdown':
          case 'pointerup':
            // prevent drag, click, pinch, etc. gestures on our overlay
            // will bubble to viewer since we didn't set stopPropagation to true
            // viewer will process since we didn't set preventDefault to true
            eventInfo.preventGesture = true;
            break;
          case 'contextmenu':
            // prevent context menu from popping up
            eventInfo.preventDefault = true;
            break;
          default:
            break;
        }
      },
    });

    const mouseTracker3 = new OpenSeadragon.MouseTracker({
      userData: 'overlay3.Tracker',
      element: overlay3Ref.current || '', //'overlay3',
      preProcessEventHandler: function (eventInfo) {
        switch (eventInfo.eventType) {
          case 'pointerdown':
          case 'pointerup':
            // prevent drag, click, pinch, etc. gestures on the viewer
            // when events bubble, preventDefault true indicates to viewer
            //    that we handled the events
            eventInfo.preventDefault = true;
            break;
          case 'contextmenu':
            // prevent context menu from popping up
            eventInfo.preventDefault = true;
            break;
          default:
            break;
        }
      },
      dragHandler: function (event) {
        // drag the overlay
        const overlay = viewer.getOverlayById('overlay3');
        const delta = viewer.viewport.deltaPointsFromPixels(event.delta);
        overlay.update(overlay.location.plus(delta));
        if (viewer.overlaysContainer) {
          overlay.drawHTML(viewer.overlaysContainer, viewer.viewport);
        }
      },
    });

    // Cleanup
    return () => {
      mouseTracker3.destroy();
      mouseTracker2.destroy();
      mouseTracker1.destroy();
      viewer.destroy();
    };
  }, []);

  return {
    overlay1Ref,
    overlay2Ref,
    overlay3Ref,
    isOverlay1Selected,
  };
}

function MouseTrackerComponent() {
  const { overlay1Ref, overlay2Ref, overlay3Ref, isOverlay1Selected } =
    useOsdViewer();

  return (
    <div className="m-0 h-full p-4">
      <div
        id={ElementIds.OSDVIEWER}
        className="m-0 h-full bg-gray-200 p-0 text-gray-400 dark:bg-black"
      ></div>
      <div
        className={cn(
          'pointer-events-auto m-0 h-full touch-none bg-black p-4 text-sm opacity-30',
          isOverlay1Selected ? 'text-red-500' : 'text-white',
        )}
        //   fontSize: 'ui',
        // })({ isSelected: isOverlay1Selected })}
        id="overlay1"
        ref={overlay1Ref}
      >
        <p className="touch-action-none pointer-events-none">
          Click to Toggle Color
        </p>
        <p className="touch-action-none pointer-events-none cursor-pointer">
          <a
            className="pointer-events-auto"
            href="http://openseadragon.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            I&apos;m a link!
          </a>
        </p>
      </div>
      <div
        className="cursor-not-allowed bg-yellow-200 p-4 text-sm text-black opacity-40"
        id="overlay2"
        ref={overlay2Ref}
      >
        <p className="touch-action-none pointer-events-none">
          Can&apos;t Drag Me
        </p>
      </div>
      <div
        className="cursor-grab bg-cyan-600 p-4 text-sm text-black opacity-40"
        id="overlay3"
        ref={overlay3Ref}
      >
        <p className="touch-action-none pointer-events-none">Drag Me!</p>
      </div>
    </div>
  );
}
