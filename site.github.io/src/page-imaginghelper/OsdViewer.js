import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './OsdViewer.scss';

//import OpenSeadragon from '../lib/openseadragon/openseadragon';
import OpenSeadragon from 'openseadragon';
//import 'openseadragon';
import '@openseadragon-imaging/openseadragon-imaginghelper';
import '@openseadragon-imaging/openseadragon-viewerinputhook';

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

OsdViewer.propTypes = {
	setHaveImage: PropTypes.func,
	setHaveMouse: PropTypes.func,
	setImageProps: PropTypes.func,
	setOsdMouseRelativeProps: PropTypes.func,
	setMouseProps: PropTypes.func,
	setViewerProps: PropTypes.func,
	setScreenCoordinateProps: PropTypes.func,
	setDataCoordinateProps: PropTypes.func
};

function OsdViewer(props) {
	const {
		setHaveImage,
		setHaveMouse,
		setImageProps,
		setOsdMouseRelativeProps,
		setMouseProps,
		setViewerProps,
		setScreenCoordinateProps,
		setDataCoordinateProps
	} = props;

	useEffect(() => {
		let viewer = new OpenSeadragon.Viewer({
			debugMode: true,
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

		let imagingHelper = viewer.activateImagingHelper({
			worldIndex: 0,
			onImageViewChanged: (event) => {
				// event.viewportWidth == width of viewer viewport in logical
				//   coordinates relative to image native size
				// event.viewportHeight == height of viewer viewport in logical
				//   coordinates relative to image native size
				// event.viewportOrigin == OpenSeadragon.Point, top-left of the
				//   viewer viewport in logical coordinates relative to image
				// event.viewportCenter == OpenSeadragon.Point, center of the
				//   viewer viewport in logical coordinates relative to image
				// event.zoomFactor == current zoom factor
				updateImgViewerViewVM();
				updateImgViewerScreenCoordinatesVM();
				updateImgViewerDataCoordinatesVM();
			}
		});

		let viewerInputHook = viewer.addViewerInputHook({
			hooks: [
				{
					tracker: 'viewer',
					handler: 'moveHandler',
					hookHandler: (event) => {
						// set event.stopHandlers = true to prevent any more
						//   handlers in the chain from being called
						// set event.stopBubbling = true to prevent the original
						//   event from bubbling
						// set event.preventDefaultAction = true to prevent
						//   viewer's default action
						setOsdMouseRelativeProps({
							osdMouseRelativeX: event.position.x,
							osdMouseRelativeY: event.position.y
						});
						event.stopHandlers = true;
						event.stopBubbling = true;
						event.preventDefaultAction = true;
					}
				},
				{
					tracker: 'viewer',
					handler: 'scrollHandler',
					hookHandler: (event) => {
						// set event.stopHandlers = true to prevent any more
						//   handlers in the chain from being called
						// set event.stopBubbling = true to prevent the original
						//   event from bubbling
						// set event.preventDefaultAction = true to prevent
						//   viewer's default action
						let logPoint = imagingHelper.physicalToLogicalPoint(
							event.position
						);
						if (event.scroll > 0) {
							imagingHelper.zoomInAboutLogicalPoint(logPoint);
						} else {
							imagingHelper.zoomOutAboutLogicalPoint(logPoint);
						}
						event.stopBubbling = true;
						event.preventDefaultAction = true;
					}
				},
				{
					tracker: 'viewer',
					handler: 'clickHandler',
					hookHandler: (event) => {
						// set event.stopHandlers = true to prevent any more
						//   handlers in the chain from being called
						// set event.stopBubbling = true to prevent the original
						//   event from bubbling
						// set event.preventDefaultAction = true to prevent
						//   viewer's default action
						if (event.quick) {
							let logPoint = imagingHelper.physicalToLogicalPoint(
								event.position
							);
							if (event.shift) {
								imagingHelper.zoomOutAboutLogicalPoint(
									logPoint
								);
							} else {
								imagingHelper.zoomInAboutLogicalPoint(logPoint);
							}
						}
						event.stopBubbling = true;
						event.preventDefaultAction = true;
					}
				}
			]
		});

		let osdCanvasEl = null;
		let haveImage = false;
		let haveMouse = false;
		let mouseRelativeX = 0;
		let mouseRelativeY = 0;

		let updateImageVM = function () {
			if (haveImage) {
				setImageProps({
					imgWidth: imagingHelper.imgWidth,
					imgHeight: imagingHelper.imgHeight,
					imgAspectRatio: imagingHelper.imgAspectRatio,
					minZoom: imagingHelper.getMinZoom(),
					maxZoom: imagingHelper.getMaxZoom()
				});
			}
		};

		let updateImgViewerViewVM = function () {
			if (haveImage) {
				let containerSize = viewer.viewport.getContainerSize();
				let boundsRect = viewer.viewport.getBounds(true);
				let tiledImage = viewer.world.getItemAt(0);
				let boundsTiledImageRect = tiledImage.getBounds(true);
				setViewerProps({
					osdContainerWidth: containerSize.x,
					osdContainerHeight: containerSize.y,
					osdZoom: viewer.viewport.getZoom(true),
					osdBoundsX: boundsRect.x,
					osdBoundsY: boundsRect.y,
					osdBoundsWidth: boundsRect.width,
					osdBoundsHeight: boundsRect.height,
					osdTiledImageBoundsX: boundsTiledImageRect.x,
					osdTiledImageBoundsY: boundsTiledImageRect.y,
					osdTiledImageBoundsWidth: boundsTiledImageRect.width,
					osdTiledImageBoundsHeight: boundsTiledImageRect.height,
					zoomFactor: imagingHelper.getZoomFactor(),
					viewportWidth: imagingHelper._viewportWidth,
					viewportHeight: imagingHelper._viewportHeight,
					viewportOriginX: imagingHelper._viewportOrigin.x,
					viewportOriginY: imagingHelper._viewportOrigin.y,
					viewportCenterX: imagingHelper._viewportCenter.x,
					viewportCenterY: imagingHelper._viewportCenter.y
				});
			}
		};

		let updateImgViewerScreenCoordinatesVM = function () {
			if (haveImage && haveMouse) {
				let logX = imagingHelper.physicalToLogicalX(mouseRelativeX);
				let logY = imagingHelper.physicalToLogicalY(mouseRelativeY);
				let dataX = imagingHelper.physicalToDataX(mouseRelativeX);
				let dataY = imagingHelper.physicalToDataY(mouseRelativeY);
				setScreenCoordinateProps({
					physicalToLogicalX: logX,
					physicalToLogicalY: logY,
					logicalToPhysicalX: imagingHelper.logicalToPhysicalX(logX),
					logicalToPhysicalY: imagingHelper.logicalToPhysicalY(logY),
					physicalToDataX: dataX,
					physicalToDataY: dataY,
					dataToPhysicalX: imagingHelper.dataToPhysicalX(dataX),
					dataToPhysicalY: imagingHelper.dataToPhysicalY(dataY)
				});
			}
		};

		let updateImgViewerDataCoordinatesVM = function () {
			if (haveImage) {
				setDataCoordinateProps({
					logicalToDataTLX: imagingHelper.logicalToDataX(0.0),
					logicalToDataTLY: imagingHelper.logicalToDataY(0.0),
					logicalToDataBRX: imagingHelper.logicalToDataX(1.0),
					logicalToDataBRY: imagingHelper.logicalToDataY(1.0),
					dataToLogicalTLX: imagingHelper.dataToLogicalX(0),
					dataToLogicalTLY: imagingHelper.dataToLogicalY(0),
					dataToLogicalBRX: imagingHelper.dataToLogicalX(
						imagingHelper.imgWidth
					),
					dataToLogicalBRY: imagingHelper.dataToLogicalY(
						imagingHelper.imgHeight
					)
				});
			}
		};

		let onWindowResize = function () {
			if (viewer && imagingHelper && !viewer.autoResize) {
				// We're handling viewer resizing ourselves. Let the ImagingHelper do it.
				imagingHelper.notifyResize();
			}
		};

		let onOsdCanvasMouseEnter = function (event) {
			haveMouse = true;
			setHaveMouse(true);
			updateImgViewerScreenCoordinatesVM();
		};

		let onOsdCanvasMouseMove = function (event) {
			let osdmouse = OpenSeadragon.getMousePosition(event);
			let osdoffset = OpenSeadragon.getElementOffset(viewer.canvas);
			// //TODO this used jquery offset() previously
			// //  Should calc these ourselves to do a better compare to OSD values
			// let offset = osdCanvasEl.offset();
			// mouseRelativeX = event.pageX - offset.left;
			// mouseRelativeY = event.pageY - offset.top;
			let offset = OpenSeadragon.getElementOffset(osdCanvasEl);
			mouseRelativeX = event.pageX - offset.x;
			mouseRelativeY = event.pageY - offset.y;
			setMouseProps({
				osdMousePositionX: osdmouse.x,
				osdMousePositionY: osdmouse.y,
				osdElementOffsetX: osdoffset.x,
				osdElementOffsetY: osdoffset.y,
				mousePositionX: event.pageX,
				mousePositionY: event.pageY,
				// elementOffsetX: offset.left,
				// elementOffsetY: offset.top,
				elementOffsetX: offset.x,
				elementOffsetY: offset.y,
				mouseRelativeX: mouseRelativeX,
				mouseRelativeY: mouseRelativeY
			});
			updateImgViewerScreenCoordinatesVM();
		};

		let onOsdCanvasMouseLeave = function (event) {
			haveMouse = false;
			setHaveMouse(false);
		};

		let onOpen = function (event) {
			osdCanvasEl = viewer.canvas;

			let minzoomX = 50.0 / imagingHelper.imgWidth;
			let minzoomY = 50.0 / imagingHelper.imgHeight;
			let minZoom = Math.min(minzoomX, minzoomY);
			let maxZoom = 10.0;
			imagingHelper.setMinZoom(minZoom);
			imagingHelper.setMaxZoom(maxZoom);
			imagingHelper.setZoomStepPercent(35);

			haveImage = true;
			setHaveImage(true);

			OpenSeadragon.addEvent(
				osdCanvasEl,
				'mouseenter',
				onOsdCanvasMouseEnter,
				false
			);
			OpenSeadragon.addEvent(
				osdCanvasEl,
				'mousemove',
				onOsdCanvasMouseMove,
				false
			);
			OpenSeadragon.addEvent(
				osdCanvasEl,
				'mouseleave',
				onOsdCanvasMouseLeave,
				false
			);

			updateImageVM();
			updateImgViewerViewVM();
			updateImgViewerDataCoordinatesVM();
		};

		let onClose = function (event) {
			haveImage = false;
			setHaveImage(false);

			OpenSeadragon.removeEvent(
				osdCanvasEl,
				'mouseenter',
				onOsdCanvasMouseEnter,
				false
			);
			OpenSeadragon.removeEvent(
				osdCanvasEl,
				'mousemove',
				onOsdCanvasMouseMove,
				false
			);
			OpenSeadragon.removeEvent(
				osdCanvasEl,
				'mouseleave',
				onOsdCanvasMouseLeave,
				false
			);

			osdCanvasEl = null;
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
			viewerInputHook.destroy();
			viewerInputHook = null;
			imagingHelper.destroy();
			imagingHelper = null;
			viewer.destroy();
			viewer = null;
		};
	}, [
		setHaveImage,
		setHaveMouse,
		setImageProps,
		setOsdMouseRelativeProps,
		setMouseProps,
		setViewerProps,
		setScreenCoordinateProps,
		setDataCoordinateProps
	]);

	return <div id="osdContainer" className="openseadragon" />;
}

export default OsdViewer;
