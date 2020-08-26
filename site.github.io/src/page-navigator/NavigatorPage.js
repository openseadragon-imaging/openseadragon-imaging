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
			autoResize: true, // If false, we have to handle resizing of the viewer
			//------------------
			navigationControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
			//------------------
			showNavigator: true,
			navigatorId: 'osdNavContainer',
			//------------------
			sequenceMode: true,
			sequenceControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
			//------------------
			tileSources: tileSources
		});

		// Cleanup (componentWillUnmount)
		return () => {
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
