import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './OsdViewer.scss';

//import OpenSeadragon from '../lib/openseadragon/openseadragon';
import OpenSeadragon from 'openseadragon';
//import 'openseadragon';
import '@openseadragon-imaging/openseadragon-consolehook';
import '@openseadragon-imaging/openseadragon-imaginghelper';

import osdNavImages from '../common/OsdNavImages';

const tileSourcesPrefix = '/dzimages/';
const tileSources = [
  tileSourcesPrefix + 'testpattern.dzi',
  tileSourcesPrefix + 'tall.dzi',
  tileSourcesPrefix + 'wide.dzi',
  new OpenSeadragon.LegacyTileSource([
    {
      url: tileSourcesPrefix + 'dog_radiograph_2.jpg',
      width: 1909,
      height: 1331
    }
  ]),
  tileSourcesPrefix + 'cannon.xml',
  tileSourcesPrefix + 'highsmith.dzi',
  {
    height: 512 * 256,
    width: 512 * 256,
    tileSize: 256,
    minLevel: 8,
    getTileUrl: function (level, x, y) {
      return (
        'http://s3.amazonaws.com/com.modestmaps.bluemarble/' +
        (level - 8) +
        '-r' +
        y +
        '-c' +
        x +
        '.jpg'
      );
    }
  },
  tileSourcesPrefix + '6a32487.dzi'
];

OsdViewer.propTypes = {
  addConsoleRow: PropTypes.func
};

function OsdViewer(props) {
  const { addConsoleRow } = props;

  useEffect(() => {
    let viewer = new OpenSeadragon.Viewer({
      debugMode: false,
      id: 'osdContainer',
      prefixUrl: '', //'lib/openseadragon/images/',
      navImages: osdNavImages,
      useCanvas: true,
      autoResize: false, // If false, we have to handle resizing of the viewer
      imageSmoothingEnabled: true,
      // blendTime: 0,
      // wrapHorizontal: true,
      // visibilityRatio: 0.1,
      // minZoomLevel: 0.001,
      // maxZoomLevel: 10,
      // zoomPerClick: 1.4,
      // zoomPerSecond: 1.2,
      minZoomImageRatio: 0,
      maxZoomPixelRatio: Infinity,
      smoothTileEdgesMinZoom: Infinity,
      //------------------
      // gestureSettingsMouse: {
      // 	flickEnabled: true
      // },
      // gestureSettingsTouch: {
      // 	pinchRotate: true
      // },
      //------------------
      //showNavigationControl: true,
      navigationControlAnchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
      // showRotationControl: true,
      // showFlipControl: true,
      //------------------
      showNavigator: false,
      navigatorPosition: 'BOTTOM_RIGHT',
      navigatorSizeRatio: 0.3,
      //navigatorId: 'navigatorDiv1',
      //navigatorAutoResize: false,
      navigatorAutoFade: false,
      //------------------
      sequenceMode: true,
      // initialPage: 3,
      // preserveViewport: true,
      // preserveOverlays: false,
      // showSequenceControl: true,
      sequenceControlAnchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
      showReferenceStrip: false,
      referenceStripScroll: 'horizontal',
      // referenceStripElement: null,
      // referenceStripHeight: null,
      // referenceStripWidth: null,
      referenceStripPosition: 'BOTTOM_LEFT',
      // referenceStripSizeRatio: 0.2,
      //------------------
      collectionMode: false,
      // collectionLayout: 'horizontal',
      collectionRows: 2,
      collectionColumns: 2,
      // collectionTileSize: 800,
      // collectionTileMargin: 80,
      //------------------
      tileSources: tileSources
      //------------------
      // gestureSettingsMouse: {
      //   clickToZoom: true
      // }
    });

    let consoleHook = viewer.addConsoleHook({
      //new OpenSeadragonConsoleHook({
      log: function (msg) {
        addConsoleRow({
          msg: msg || '<NOMSG>',
          itemClass: 'console-item-log'
        });
        return true;
      },
      debug: function (msg) {
        addConsoleRow({
          msg: msg || '<NOMSG>',
          itemClass: 'console-item-debug'
        });
        return true;
      },
      info: function (msg) {
        addConsoleRow({
          msg: msg || '<NOMSG>',
          itemClass: 'console-item-info'
        });
        return true;
      },
      warn: function (msg) {
        addConsoleRow({
          msg: msg || '<NOMSG>',
          itemClass: 'console-item-warn'
        });
        return true;
      },
      error: function (msg) {
        addConsoleRow({
          msg: msg || '<NOMSG>',
          itemClass: 'console-item-error'
        });
        return true;
      }
    });

    // let onImageViewChanged = function () {
    // 	let tiledImage = viewer.world.getItemAt(0);
    // 	let imgRect = tiledImage.getBounds(true);
    // 	let elementRect = viewer.viewport.viewportToViewerElementRectangle(
    // 		imgRect
    // 	);
    // 	el.style.left = elementRect.x.toString() + 'px';
    // 	el.style.top = elementRect.y.toString() + 'px';
    // 	el.style.width = elementRect.width.toString() + 'px';
    // 	el.style.height = elementRect.height.toString() + 'px';
    // 	// return tiledImage.viewerElementToImageCoordinates(point);
    // };

    let imagingHelper = viewer.activateImagingHelper({
      worldIndex: 0 //,
      //onImageViewChanged: onImageViewChanged
    });

    let onWindowResize = function () {
      if (viewer && imagingHelper && !viewer.autoResize) {
        // We're handling viewer resizing ourselves. Let the ImagingHelper do it.
        imagingHelper.notifyResize();
      }
    };

    let onOpen = function (event) {
      var minzoomX = 50.0 / imagingHelper.imgWidth;
      var minzoomY = 50.0 / imagingHelper.imgHeight;
      var minZoom = Math.min(minzoomX, minzoomY);
      var maxZoom = 10.0;
      imagingHelper.setMinZoom(minZoom);
      imagingHelper.setMaxZoom(maxZoom);
      imagingHelper.setZoomStepPercent(35);

      OpenSeadragon.console.log('[onOpen] log');
      OpenSeadragon.console.debug('[onOpen] debug');
      OpenSeadragon.console.info('[onOpen] info');
      OpenSeadragon.console.warn('[onOpen] warn');
      OpenSeadragon.console.error('[onOpen] error');
    };

    let onOpenFailed = function (event) {};

    let onClose = function (event) {
      OpenSeadragon.console.log('[onClose] log');
      OpenSeadragon.console.debug('[onClose] debug');
      OpenSeadragon.console.info('[onClose] info');
      OpenSeadragon.console.warn('[onClose] warn');
      OpenSeadragon.console.error('[onClose] error');
    };

    // let onCanvasContextMenu = function (event) {
    //   OpenSeadragon.console.log('canvas-contextmenu');
    //   event.preventDefault = true;
    // };

    // let onNavigatorScroll = function (event) {
    //   if (event.scroll > 0) {
    //     imagingHelper.zoomIn();
    //   } else {
    //     imagingHelper.zoomOut();
    //   }
    // };

    window.addEventListener('resize', onWindowResize, false);
    viewer.addHandler('open', onOpen);
    viewer.addHandler('open-failed', onOpenFailed);
    viewer.addHandler('close', onClose);
    // viewer.addHandler('canvas-contextmenu', onCanvasContextMenu);
    // viewer.addHandler('navigator-scroll', onNavigatorScroll);
    // viewer.addHandler('canvas-pinch', (event) => {
    //   event.preventDefaultPanAction = false;
    //   event.preventDefaultZoomAction = false;
    //   event.preventDefaultRotateAction = false;
    // });
    // viewer.addHandler('canvas-scroll', (event) => {
    //   event.preventDefaultAction = false;
    // });

    // viewer.addHandler('canvas-click', (event) => {
    //   let gestureSettings = viewer.gestureSettingsByDeviceType('mouse');
    //   gestureSettings.scrollToZoom = false;
    // });

    // viewer.addHandler('canvas-click', (event) => {
    //   if (event.quick) {
    //     let overlayElement = OpenSeadragon.makeNeutralElement('div');

    //     overlayElement.className = 'my-overlay-class';
    //     (function (style) {
    //       style.fontSize = '20px';
    //       style.color = '#000';
    //       style.background = 'rgba(0,255,255,0.5)';
    //       style.padding = '20px';
    //       style.pointerEvents = 'auto';
    //       style.cursor = 'grab';
    //     })(overlayElement.style);

    //     let clickPoint = viewer.viewport.pointFromPixel(event.position);

    //     // new OpenSeadragon.MouseTracker({
    //     //   element: overlayElement,
    //     //   preProcessEventHandler: function (eventInfo) {
    //     //     switch (eventInfo.eventType) {
    //     //       case 'pointerdown':
    //     //       case 'pointerup':
    //     //         // prevent drag, click, pinch, etc. gestures on the viewer
    //     //         // when events bubble, preventDefault true indicates to viewer
    //     //         //    that we handled the events
    //     //         eventInfo.preventDefault = true;
    //     //         break;
    //     //       case 'contextmenu':
    //     //         // prevent context menu from popping up
    //     //         eventInfo.preventDefault = true;
    //     //         break;
    //     //       default:
    //     //         break;
    //     //     }
    //     //   },
    //     //   dragHandler: function (e) {
    //     //     // drag the overlay
    //     //     var overlay = viewer.getOverlayById('overlay3');
    //     //     var delta = viewer.viewport.deltaPointsFromPixels(e.delta);
    //     //     overlay.update({ location: overlay.location.plus(delta) });
    //     //     overlay.drawHTML(viewer.overlaysContainer, viewer.viewport );
    //     //   }
    //     // });

    //     viewer.addOverlay({
    //       element: overlayElement,
    //       location: new OpenSeadragon.Rect(clickPoint.x, clickPoint.y, 0.1, 0.1)
    //     });

    //     // Prevent default click-to-zoom behavior
    //     event.preventDefaultAction = true;
    //   }
    // });

    // onWindowResize();

    // Cleanup (componentWillUnmount)
    return () => {
      viewer.removeHandler('open', onOpen);
      viewer.removeHandler('open-failed', onOpenFailed);
      viewer.removeHandler('close', onClose);
      // viewer.removeHandler('navigator-scroll', onNavigatorScroll);
      window.removeEventListener('resize', onWindowResize, false);
      imagingHelper.destroy();
      imagingHelper = null;
      consoleHook.destroy();
      consoleHook = null;
      viewer.destroy();
      viewer = null;
    };
  }, [addConsoleRow]);

  return <div id="osdContainer" className="osdContainer" />;
}

export default OsdViewer;
