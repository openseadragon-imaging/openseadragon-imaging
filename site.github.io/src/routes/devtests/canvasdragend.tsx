import { createFileRoute } from '@tanstack/react-router';
//import * as React from 'react';
import { useEffect /*, useRef, useState*/ } from 'react';
import OpenSeadragon from 'openseadragon';
import osdNavImages from '../../common/osdnavimages';

export const Route = createFileRoute('/devtests/canvasdragend')({
  component: CanvasDragEndComponent,
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
      gestureSettingsMouse: {
        flickEnabled: true,
      },
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
      // overlays: [],
      //------------------
    });

    viewer.addHandler('open', (/*event*/) => {
      console.log('Viewer open event');
    });

    // viewer.addHandler('canvas-press', () => (cursor = 'grabbing'));
    // // this event always fires...
    // viewer.addHandler('canvas-release', () => (cursor = 'grab'));

    // const viewport = viewer.viewport;
    // viewer.addHandler('canvas-drag', (e) => {
    //   e.preventDefaultAction = true;
    //   viewport.panBy(viewport.deltaPointsFromPixels(e.delta.negate()), true);
    // });

    // // ...this event doesn't
    // viewer.addHandler('canvas-drag-end', (e) => {
    //   e.preventDefaultAction = true;

    //   const x = 0.25 * e.speed * Math.cos(e.direction);
    //   const y = 0.25 * e.speed * Math.sin(e.direction);
    //   const center = viewport.pixelFromPoint(viewport.getCenter(true));
    //   const target = viewport.pointFromPixel(
    //     new OpenSeadragon.Point(center.x - x, center.y - y),
    //   );
    //   viewport.panTo(target, false);

    //   viewport.applyConstraints();
    // });

    // Cleanup
    return () => {
      viewer.destroy();
    };
  }, []);

  return {};
}

function CanvasDragEndComponent() {
  useOsdViewer();

  return (
    <div className="m-0 h-full p-4">
      <div
        id={ElementIds.OSDVIEWER}
        className="m-0 h-full bg-gray-200 p-0 text-gray-400 dark:bg-black"
      ></div>
    </div>
  );
}
