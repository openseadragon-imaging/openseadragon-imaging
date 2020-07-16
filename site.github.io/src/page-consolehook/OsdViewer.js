import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './OsdViewer.scss';

//import OpenSeadragon from '../lib/openseadragon/openseadragon';
import OpenSeadragon from 'openseadragon';
//import 'openseadragon';
import '@openseadragon-imaging/openseadragon-consolehook';
import '@openseadragon-imaging/openseadragon-imaginghelper';

import osdNavImages from '../common/OsdNavImages';

const tileSourcesPrefix = './dzimages/';
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
			// blendTime: 0,
			// wrapHorizontal: true,
			// visibilityRatio: 0.1,
			// minZoomLevel: 0.001,
			// maxZoomLevel: 10,
			// zoomPerClick: 1.4,
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
			showNavigationControl: true,
			navigationControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
			// showRotationControl: true,
			// showFlipControl: true,
			//------------------
			showNavigator: false,
			// navigatorSizeRatio: 0.25,
			navigatorId: 'navigatorDiv1',
			navigatorAutoResize: false,
			//------------------
			sequenceMode: true,
			// initialPage: 3,
			// preserveViewport: true,
			// preserveOverlays: false,
			showSequenceControl: true,
			sequenceControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
			// showReferenceStrip: true,
			// referenceStripScroll: 'horizontal',
			// referenceStripElement: null,
			// referenceStripHeight: null,
			// referenceStripWidth: null,
			// referenceStripPosition: 'BOTTOM_LEFT',
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

		let onClose = function (event) {
			OpenSeadragon.console.log('[onClose] log');
			OpenSeadragon.console.debug('[onClose] debug');
			OpenSeadragon.console.info('[onClose] info');
			OpenSeadragon.console.warn('[onClose] warn');
			OpenSeadragon.console.error('[onClose] error');
		};

		let onNavigatorScroll = function (event) {
			if (event.scroll > 0) {
				imagingHelper.zoomIn();
			} else {
				imagingHelper.zoomOut();
			}
		};

		window.addEventListener('resize', onWindowResize, false);
		viewer.addHandler('open', onOpen);
		viewer.addHandler('close', onClose);
		viewer.addHandler('navigator-scroll', onNavigatorScroll);

		onWindowResize();

		// Cleanup (componentWillUnmount)
		return () => {
			viewer.removeHandler('open', onOpen);
			viewer.removeHandler('close', onClose);
			viewer.removeHandler('navigator-scroll', onNavigatorScroll);
			window.removeEventListener('resize', onWindowResize, false);
			imagingHelper.destroy();
			imagingHelper = null;
			consoleHook.destroy();
			consoleHook = null;
			viewer.destroy();
			viewer = null;
		};
	}, [addConsoleRow]);

	return <div id="osdContainer" className="openseadragon" />;
}

export default OsdViewer;
