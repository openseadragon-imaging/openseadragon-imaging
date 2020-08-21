import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpenSeadragon from 'openseadragon';
import '@openseadragon-imaging/openseadragon-imaginghelper';
import './NavigatorPage.scss';

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
	tileSourcesPrefix + '6a32487.dzi'
];

function NavigatorPage(props) {
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
			navigationControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
			// showRotationControl: true,
			// showFlipControl: true,
			//------------------
			showNavigator: true,
			//navigatorPosition: 'BOTTOM_RIGHT',
			//navigatorSizeRatio: 0.3,
			navigatorId: 'osdNavContainer',
			//navigatorAutoResize: false,
			//navigatorAutoFade: false,
			//------------------
			sequenceMode: true,
			// initialPage: 3,
			// preserveViewport: true,
			// preserveOverlays: false,
			// showSequenceControl: true,
			sequenceControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
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
		});

		// let imagingHelper = viewer.activateImagingHelper({
		// 	worldIndex: 0 //,
		// 	//onImageViewChanged: onImageViewChanged
		// });

		// let onWindowResize = function () {
		// 	if (viewer && imagingHelper && !viewer.autoResize) {
		// 		// We're handling viewer resizing ourselves. Let the ImagingHelper do it.
		// 		imagingHelper.notifyResize();
		// 	}
		// };

		// let onOpen = function (event) {
		// 	var minzoomX = 50.0 / imagingHelper.imgWidth;
		// 	var minzoomY = 50.0 / imagingHelper.imgHeight;
		// 	var minZoom = Math.min(minzoomX, minzoomY);
		// 	var maxZoom = 10.0;
		// 	imagingHelper.setMinZoom(minZoom);
		// 	imagingHelper.setMaxZoom(maxZoom);
		// 	imagingHelper.setZoomStepPercent(35);
		// };

		// let onClose = function (event) {};

		// let onNavigatorScroll = function (event) {
		// 	if (event.scroll > 0) {
		// 		imagingHelper.zoomIn();
		// 	} else {
		// 		imagingHelper.zoomOut();
		// 	}
		// };

		// window.addEventListener('resize', onWindowResize, false);
		// viewer.addHandler('open', onOpen);
		// viewer.addHandler('close', onClose);
		// viewer.addHandler('navigator-scroll', onNavigatorScroll);

		// onWindowResize();

		// Cleanup (componentWillUnmount)
		return () => {
			// viewer.removeHandler('open', onOpen);
			// viewer.removeHandler('close', onClose);
			// viewer.removeHandler('navigator-scroll', onNavigatorScroll);
			// window.removeEventListener('resize', onWindowResize, false);
			// imagingHelper.destroy();
			// imagingHelper = null;
			viewer.destroy();
			viewer = null;
		};
	}, []);

	return (
		<Row className="navigator-page">
			<Col md={9} xs={12}>
				<Container fluid className="viewer-pane">
					<Row>
						<Col className="viewer-container">
							<div id="osdContainer" className="osdContainer" />
						</Col>
					</Row>
				</Container>
			</Col>
			<Col md={3} xs={12}>
				<Container fluid className="navigator-pane">
					<Row>
						<Col className="navigator-container">
							<div
								id="osdNavContainer"
								className="osdNavContainer"
							/>
						</Col>
					</Row>
				</Container>
			</Col>
		</Row>
	);
}

export default NavigatorPage;
