import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './ImagingHelperPage.scss';
import OsdViewer from './OsdViewer';
import PropList from './PropList';

function ImagingHelperPage(props) {
  const [browserProps, setBrowserProps] = useState({
    vendor: '',
    version: 0,
    alpha: false,
    opacity: false
  });
  const [trackerProps, setTrackerProps] = useState({
    wheelEventName: '',
    havePointerCapture: false,
    havePointerEvents: false,
    unprefixedPointerEvents: false,
    havePointerOverOut: false
  });
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
    <Row noGutters className="imaginghelper-page">
      <Col md={{ order: 1, span: 3 }} xs={{ order: 2, span: 12 }}>
        <Container fluid className="prop-pane">
          <Row>
            <Col className="prop-list-container">
              <PropList
                browserProps={browserProps}
                trackerProps={trackerProps}
                haveImage={haveImage}
                haveMouse={haveMouse}
                imageProps={imageProps}
                osdMouseRelativeProps={osdMouseRelativeProps}
                mouseProps={mouseProps}
                viewerProps={viewerProps}
                screenCoordinateProps={screenCoordinateProps}
                dataCoordinateProps={dataCoordinateProps}
              />
            </Col>
          </Row>
        </Container>
      </Col>
      <Col md={{ order: 2, span: 9 }} xs={{ order: 1, span: 12 }}>
        <Container fluid className="viewer-pane">
          <Row>
            <Col className="viewer-container">
              <OsdViewer
                setBrowserProps={setBrowserProps}
                setTrackerProps={setTrackerProps}
                setHaveImage={setHaveImage}
                setHaveMouse={setHaveMouse}
                setImageProps={setImageProps}
                setOsdMouseRelativeProps={setOsdMouseRelativeProps}
                setMouseProps={setMouseProps}
                setViewerProps={setViewerProps}
                setScreenCoordinateProps={setScreenCoordinateProps}
                setDataCoordinateProps={setDataCoordinateProps}
              />
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

export default ImagingHelperPage;
