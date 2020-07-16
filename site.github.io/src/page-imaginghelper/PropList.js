import React from 'react';
import PropTypes from 'prop-types';
import './PropList.scss';

PropList.propTypes = {
	haveImage: PropTypes.bool,
	haveMouse: PropTypes.bool,
	imageProps: PropTypes.shape({
		imgWidth: PropTypes.number,
		imgHeight: PropTypes.number,
		imgAspectRatio: PropTypes.number,
		minZoom: PropTypes.number,
		maxZoom: PropTypes.number
	}),
	osdMouseRelativeProps: PropTypes.shape({
		osdMouseRelativeX: PropTypes.number,
		osdMouseRelativeY: PropTypes.number
	}),
	mouseProps: PropTypes.shape({
		osdMousePositionX: PropTypes.number,
		osdMousePositionY: PropTypes.number,
		osdElementOffsetX: PropTypes.number,
		osdElementOffsetY: PropTypes.number,
		mousePositionX: PropTypes.number,
		mousePositionY: PropTypes.number,
		elementOffsetX: PropTypes.number,
		elementOffsetY: PropTypes.number,
		mouseRelativeX: PropTypes.number,
		mouseRelativeY: PropTypes.number
	}),
	viewerProps: PropTypes.shape({
		osdContainerWidth: PropTypes.number,
		osdContainerHeight: PropTypes.number,
		osdZoom: PropTypes.number,
		osdBoundsX: PropTypes.number,
		osdBoundsY: PropTypes.number,
		osdBoundsWidth: PropTypes.number,
		osdBoundsHeight: PropTypes.number,
		osdTiledImageBoundsX: PropTypes.number,
		osdTiledImageBoundsY: PropTypes.number,
		osdTiledImageBoundsWidth: PropTypes.number,
		osdTiledImageBoundsHeight: PropTypes.number,
		zoomFactor: PropTypes.number,
		viewportWidth: PropTypes.number,
		viewportHeight: PropTypes.number,
		viewportOriginX: PropTypes.number,
		viewportOriginY: PropTypes.number,
		viewportCenterX: PropTypes.number,
		viewportCenterY: PropTypes.number
	}),
	screenCoordinateProps: PropTypes.shape({
		physicalToLogicalX: PropTypes.number,
		physicalToLogicalY: PropTypes.number,
		logicalToPhysicalX: PropTypes.number,
		logicalToPhysicalY: PropTypes.number,
		physicalToDataX: PropTypes.number,
		physicalToDataY: PropTypes.number,
		dataToPhysicalX: PropTypes.number,
		dataToPhysicalY: PropTypes.number
	}),
	dataCoordinateProps: PropTypes.shape({
		logicalToDataTLX: PropTypes.number,
		logicalToDataTLY: PropTypes.number,
		logicalToDataBRX: PropTypes.number,
		logicalToDataBRY: PropTypes.number,
		dataToLogicalTLX: PropTypes.number,
		dataToLogicalTLY: PropTypes.number,
		dataToLogicalBRX: PropTypes.number,
		dataToLogicalBRY: PropTypes.number
	})
};

function PropList(props) {
	const {
		haveImage,
		haveMouse,
		imageProps,
		osdMouseRelativeProps,
		mouseProps,
		viewerProps,
		screenCoordinateProps,
		dataCoordinateProps
	} = props;

	return (
		<ul className="prop-list">
			<li key="0" className="prop-list-item">
				<pre>haveImage: {JSON.stringify(haveImage, null, 2)}</pre>
			</li>
			<li key="1" className="prop-list-item">
				<pre>haveMouse: {JSON.stringify(haveMouse, null, 2)}</pre>
			</li>
			<li key="2" className="prop-list-item">
				<pre>imageProps: {JSON.stringify(imageProps, null, 2)}</pre>
			</li>
			<li key="3" className="prop-list-item">
				<pre>viewerProps: {JSON.stringify(viewerProps, null, 2)}</pre>
			</li>
			<li key="4" className="prop-list-item">
				<pre>mouseProps: {JSON.stringify(mouseProps, null, 2)}</pre>
			</li>
			<li key="5" className="prop-list-item">
				<pre>
					osdMouseRelativeProps:{' '}
					{JSON.stringify(osdMouseRelativeProps, null, 2)}
				</pre>
			</li>
			<li key="6" className="prop-list-item">
				<pre>
					screenCoordinateProps:{' '}
					{JSON.stringify(screenCoordinateProps, null, 2)}
				</pre>
			</li>
			<li key="7" className="prop-list-item">
				<pre>
					dataCoordinateProps:{' '}
					{JSON.stringify(dataCoordinateProps, null, 2)}
				</pre>
			</li>
		</ul>
	);
}

export default PropList;
