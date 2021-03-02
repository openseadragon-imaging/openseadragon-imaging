import React, { useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpenSeadragon from 'openseadragon';
import './MouseTrackerPage.scss';

//import osdNavImages from '../common/OsdNavImages';

// const tileSourcesPrefix = '/dzimages/';
// const tileSources = [
// 	tileSourcesPrefix + 'testpattern.dzi',
// 	tileSourcesPrefix + 'tall.dzi',
// 	tileSourcesPrefix + 'wide.dzi',
// 	new OpenSeadragon.LegacyTileSource([
// 		{
// 			url: tileSourcesPrefix + 'dog_radiograph_2.jpg',
// 			width: 1909,
// 			height: 1331
// 		}
// 	]),
// 	tileSourcesPrefix + 'cannon.xml',
// 	tileSourcesPrefix + 'highsmith.dzi',
// 	tileSourcesPrefix + '6a32487.dzi'
// ];

function MouseTrackerPage(props) {
  let overlay1Ref = useRef(null);

  const [overlay1Selected, setOverlay1Selected] = useState(false);

  useEffect(() => {
    // let viewer = new OpenSeadragon.Viewer({
    // 	debugMode: false,
    // 	id: 'osdContainer',
    // 	prefixUrl: '', //'lib/openseadragon/images/',
    // 	navImages: osdNavImages,
    // 	useCanvas: true,
    // 	autoResize: true, // If false, we have to handle resizing of the viewer
    // 	//------------------
    // 	navigationControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
    // 	//------------------
    // 	// minZoomLevel: 0.001,
    // 	// maxZoomLevel: 10,
    // 	// zoomPerClick: 1.4,
    // 	// zoomPerSecond: 1.2,
    // 	minZoomImageRatio: 0,
    // 	maxZoomPixelRatio: Infinity,
    // 	//------------------
    // 	sequenceMode: true,
    // 	sequenceControlAnchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
    // 	//------------------
    // 	tileSources: tileSources
    // });

    let duomo = {
      Image: {
        xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
        Url: '//openseadragon.github.io/example-images/duomo/duomo_files/',
        Format: 'jpg',
        Overlap: '2',
        TileSize: '256',
        Size: {
          Width: '13920',
          Height: '10200'
        }
      }
    };

    let viewer = OpenSeadragon({
      id: 'seadragon-viewer',
      prefixUrl: '//openseadragon.github.io/openseadragon/images/',
      //navImages: osdNavImages,
      tileSources: duomo,
      overlays: [
        {
          id: 'overlay1',
          x: 0.2,
          y: 0.2
        }
      ]
    });

    /**
     * Used for the processing/disposition of DOM events (propagation, default handling, capture, etc.)
     *
     * @typedef {Object} EventProcessInfo
     * @memberof OpenSeadragon.MouseTracker
     * @since v2.5.0
     *
     * @property {OpenSeadragon.MouseTracker} eventSource
     *      A reference to the tracker instance.
     * @property {Object} originalEvent
     *      The original DOM event object.
     * @property {Number} eventPhase
     *      0 == NONE, 1 == CAPTURING_PHASE, 2 == AT_TARGET, 3 == BUBBLING_PHASE.
     * @property {String} eventType
     *     "contextmenu", "gotpointercapture", "lostpointercapture", "pointerenter", "pointerleave", "pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel", "wheel".
     * @property {String} pointerType
     *     "mouse", "touch", "pen", etc.
     * @property {Boolean} isEmulated
     *      True if this is an emulated event. If true, originalEvent is the event that caused
     *      the emulated event or null if no DOM event applies. Emulated events
     *      can occur on eventType "pointerenter", "pointerleave", "pointerover", "pointerout".
     * @property {Boolean} isStopable
     *      True if propagation of the event (e.g. bubbling) can be stopped with stopPropagation/stopImmediatePropagation.
     * @property {Boolean} isCancelable
     *      True if the event's default handling by the browser can be prevented with preventDefault.
     * @property {Boolean} defaultPrevented
     *      True if the event's default handling has already been prevented by a descendent element.
     * @property {Boolean} preventDefault
     *      Set to true to prevent the event's default handling by the browser.
     * @property {Boolean} preventGesture
     *      Set to true to prevent this MouseTracker from generating a gesture from the event.
     *      Valid on eventType "pointerdown".
     * @property {Boolean} stopPropagation
     *      Set to true prevent the event from propagating to ancestor/descendent elements on capture/bubble phase.
     * @property {Boolean} shouldCapture
     *      (Internal Use) Set to true if the pointer should be captured (events (re)targeted to tracker element).
     * @property {Boolean} shouldReleaseCapture
     *      (Internal Use) Set to true if the captured pointer should be released.
     * @property {Object} userData
     *      Arbitrary user-defined object.
     */

    new OpenSeadragon.MouseTracker({
      userData: 'overlay1.Tracker',
      element: overlay1Ref.current, //'overlay1',
      preProcessEventHandler: function (eventInfo) {
        var target = eventInfo.originalEvent.target;
        switch (eventInfo.eventType) {
          case 'pointerdown':
          case 'pointerup':
            // prevent pointerdown/pointerup events from bubbling
            eventInfo.stopPropagation = true;
            if (target.nodeName === 'A') {
              // allow user agent to handle clicks
              eventInfo.preventDefault = false;
              // prevents clickHandler
              eventInfo.preventGesture = true;
            }
            break;
          case 'click':
            // prevent click event from bubbling
            eventInfo.stopPropagation = true;
            if (target.nodeName === 'A') {
              // allow user agent to handle clicks
              eventInfo.preventDefault = false;
            } else {
              // we'll handle clicks
              eventInfo.preventDefault = true;
            }
            break;
          default:
            break;
        }
      },
      clickHandler: function (e) {
        setOverlay1Selected((wasSelected) => {
          return !wasSelected;
        });
      }
    });

    // Cleanup (componentWillUnmount)
    return () => {
      viewer.destroy();
      viewer = null;
    };
  }, []);

  return (
    <Row className="mousetracker-page">
      <Col md={12} xs={12}>
        <Container fluid className="viewer-pane">
          <Row>
            <Col className="viewer-container">
              <div id="seadragon-viewer" className="seadragon-viewer" />
              <div
                className={overlay1Selected ? 'selected' : ''}
                id="overlay1"
                ref={overlay1Ref}
              >
                <p>Click to Toggle Color</p>
                <p>
                  <a
                    href="http://iangilman.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    I&apos;m a link!
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

export default MouseTrackerPage;
