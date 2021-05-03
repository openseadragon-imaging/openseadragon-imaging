import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpenSeadragon from 'openseadragon';
//import '@openseadragon-imaging/openseadragon-imaginghelper';
import './ReferenceStripPage.scss';

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

function ReferenceStripPage(props) {
  useEffect(() => {
    let viewer = new OpenSeadragon.Viewer({
      debugMode: false,
      id: 'osdContainer',
      prefixUrl: '', //'lib/openseadragon/images/',
      navImages: osdNavImages,
      useCanvas: true,
      autoResize: true, // If false, we have to handle resizing of the viewer
      preserveImageSizeOnResize: true,
      //------------------
      navigationControlAnchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
      //------------------
      showReferenceStrip: true,
      referenceStripElement: null,
      referenceStripScroll: 'horizontal',
      // referenceStripHeight: null,
      // referenceStripWidth: null,
      referenceStripPosition: 'BOTTOM_LEFT',
      // referenceStripSizeRatio: 0.2,
      //------------------
      sequenceMode: true,
      sequenceControlAnchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
      //------------------
      tileSources: tileSources
    });

    // viewer.addHandler('navigator-scroll', (event) => {
    // });

    // Cleanup (componentWillUnmount)
    return () => {
      viewer.destroy();
      viewer = null;
    };
  }, []);

  return (
    <Row className="referencestrip-page">
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
        <Container fluid className="referencestrip-pane">
          <Row>
            <Col className="referencestrip-container">
              <div id="osdRefStripContainer" className="osdRefStripContainer" />
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

export default ReferenceStripPage;
