import React, { useState, useEffect } from 'react';
import './ImagingHelperPage.scss';
import OsdViewer from './OsdViewer';
import PropList from './PropList';

function ImagingHelperPage(props) {
	const [haveImage, setHaveImage] = useState(false);
	const [haveMouse, setHaveMouse] = useState(false);
	const [imageProps, setImageProps] = useState({
		imgWidth: 0,
		imgHeight: 0,
		imgAspectRatio: 0,
		minZoom: 0,
		maxZoom: 0
	});
	const [osdMouseRelativeProps, setOsdMouseRelativeProps] = useState({
		osdMouseRelativeX: 0,
		osdMouseRelativeY: 0
	});
	const [mouseProps, setMouseProps] = useState({
		osdMousePositionX: 0,
		osdMousePositionY: 0,
		osdElementOffsetX: 0,
		osdElementOffsetY: 0,
		mousePositionX: 0,
		mousePositionY: 0,
		elementOffsetX: 0,
		elementOffsetY: 0,
		mouseRelativeX: 0,
		mouseRelativeY: 0
	});
	const [viewerProps, setViewerProps] = useState({
		osdContainerWidth: 0,
		osdContainerHeight: 0,
		osdZoom: 0,
		osdBoundsX: 0,
		osdBoundsY: 0,
		osdBoundsWidth: 0,
		osdBoundsHeight: 0,
		osdTiledImageBoundsX: 0,
		osdTiledImageBoundsY: 0,
		osdTiledImageBoundsWidth: 0,
		osdTiledImageBoundsHeight: 0,
		zoomFactor: 0,
		viewportWidth: 0,
		viewportHeight: 0,
		viewportOriginX: 0,
		viewportOriginY: 0,
		viewportCenterX: 0,
		viewportCenterY: 0
	});
	const [screenCoordinateProps, setScreenCoordinateProps] = useState({
		physicalToLogicalX: 0,
		physicalToLogicalY: 0,
		logicalToPhysicalX: 0,
		logicalToPhysicalY: 0,
		physicalToDataX: 0,
		physicalToDataY: 0,
		dataToPhysicalX: 0,
		dataToPhysicalY: 0
	});
	const [dataCoordinateProps, setDataCoordinateProps] = useState({
		logicalToDataTLX: 0,
		logicalToDataTLY: 0,
		logicalToDataBRX: 0,
		logicalToDataBRY: 0,
		dataToLogicalTLX: 0,
		dataToLogicalTLY: 0,
		dataToLogicalBRX: 0,
		dataToLogicalBRY: 0
	});

	useEffect(() => {}, []);

	return (
		<div className="imaginghelper-page row no-gutters">
			<div className="col-md-3 order-2 order-md-1">
				<div className="container prop-pane">
					<div className="row">
						<div className="col prop-list-container">
							<PropList
								haveImage={haveImage}
								haveMouse={haveMouse}
								imageProps={imageProps}
								osdMouseRelativeProps={osdMouseRelativeProps}
								mouseProps={mouseProps}
								viewerProps={viewerProps}
								screenCoordinateProps={screenCoordinateProps}
								dataCoordinateProps={dataCoordinateProps}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-9 order-1 order-md-2">
				<div className="container viewer-pane">
					<div className="row">
						<div className="col viewer-container">
							<OsdViewer
								setHaveImage={setHaveImage}
								setHaveMouse={setHaveMouse}
								setImageProps={setImageProps}
								setOsdMouseRelativeProps={
									setOsdMouseRelativeProps
								}
								setMouseProps={setMouseProps}
								setViewerProps={setViewerProps}
								setScreenCoordinateProps={
									setScreenCoordinateProps
								}
								setDataCoordinateProps={setDataCoordinateProps}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImagingHelperPage;
