import React, { useEffect, useRef, useState, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
//import ToggleButton from 'react-bootstrap/ToggleButton';
import OpenSeadragon from 'openseadragon';
import '@openseadragon-imaging/openseadragon-consolehook';
import './MouseTrackerPage.scss';
import ConsoleList from './ConsoleList';

import osdNavImages from '../common/OsdNavImages';

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
  let overlay2Ref = useRef(null);
  let overlay3Ref = useRef(null);

  const [overlay1Selected, setOverlay1Selected] = useState(false);

  const [consoleRows, setconsoleRows] = useState([]);

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
      prefixUrl: '', //'//openseadragon.github.io/openseadragon/images/',
      navImages: osdNavImages,
      tileSources: duomo,
      overlays: [
        {
          id: 'overlay1',
          x: 0.05,
          y: 0.05
          // px: 100,
          // py: 100
        },
        {
          id: 'overlay2',
          x: 0.35,
          y: 0.05
          // px: 100,
          // py: 600
        },
        {
          id: 'overlay3',
          x: 0.58,
          y: 0.05
          // px: 100,
          // py: 1100
        }
      ]
    });

    let addConsoleRow = function (rowObj) {
      setconsoleRows((prevConsoleRows) => {
        return prevConsoleRows.concat(rowObj);
      });
    };

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

    // viewer.addHandler('open', (event) => {
    //   // let containerSize = viewer.viewport.getContainerSize();
    //   // let centerX = containerSize.x / 2;
    //   // let centerY = containerSize.y / 2;

    //   let animateDurationMs = 1000;
    //   let start = null;

    //   let startZoom = 0.1;
    //   let endZoom = 1.0;

    //   let startAngle = 0;
    //   let endAngle = 360 * 4;

    //   function update(timeStamp) {
    //     if (!start) {
    //       start = timeStamp;
    //     }

    //     let progress = Math.min((timeStamp - start) / animateDurationMs, 1);

    //     let zoom = startZoom + (endZoom - startZoom) * progress;
    //     viewer.viewport.zoomTo(zoom, null, true);

    //     let angle = startAngle + (endAngle - startAngle) * progress;
    //     viewer.viewport.setRotation(angle);

    //     if (progress < 1) {
    //       requestAnimationFrame(update);
    //     }
    //   }

    //   requestAnimationFrame(update);
    // });

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

    let mouseTracker1 = new OpenSeadragon.MouseTracker({
      userData: 'overlay1.Tracker',
      element: overlay1Ref.current, //'overlay1',
      preProcessEventHandler: function (eventInfo) {
        let target = eventInfo.originalEvent.target;
        switch (eventInfo.eventType) {
          case 'pointerdown':
          case 'pointerup':
          case 'move':
            // prevent pointerdown/pointerup events from bubbling
            // viewer won't see these events
            eventInfo.stopPropagation = true;
            if (target.nodeName === 'A') {
              // allow user agent to handle clicks
              eventInfo.preventDefault = false;
              // prevents clickHandler call
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
          case 'contextmenu':
            // allow context menu to pop up
            eventInfo.stopPropagation = true;
            eventInfo.preventDefault = false;
            break;
          default:
            break;
        }
      },
      clickHandler: function (e) {
        //OpenSeadragon.console.log('*** clickHandler ***');
        setOverlay1Selected((wasSelected) => {
          return !wasSelected;
        });
      }
    });

    let mouseTracker2 = new OpenSeadragon.MouseTracker({
      userData: 'overlay2.Tracker',
      element: overlay2Ref.current, //'overlay2',
      preProcessEventHandler: function (eventInfo) {
        switch (eventInfo.eventType) {
          case 'pointerdown':
          case 'pointerup':
            // prevent drag, click, pinch, etc. gestures on our overlay
            // will bubble to viewer since we didn't set stopPropagation to true
            // viewer will process since we didn't set preventDefault to true
            eventInfo.preventGesture = true;
            break;
          case 'contextmenu':
            // prevent context menu from popping up
            eventInfo.preventDefault = true;
            break;
          default:
            break;
        }
      }
    });

    let mouseTracker3 = new OpenSeadragon.MouseTracker({
      userData: 'overlay3.Tracker',
      element: overlay3Ref.current, //'overlay3',
      preProcessEventHandler: function (eventInfo) {
        switch (eventInfo.eventType) {
          case 'pointerdown':
          case 'pointerup':
            // prevent drag, click, pinch, etc. gestures on the viewer
            // when events bubble, preventDefault true indicates to viewer
            //    that we handled the events
            eventInfo.preventDefault = true;
            break;
          case 'contextmenu':
            // prevent context menu from popping up
            eventInfo.preventDefault = true;
            break;
          default:
            break;
        }
      },
      dragHandler: function (e) {
        // drag the overlay
        let overlay = viewer.getOverlayById('overlay3');
        let delta = viewer.viewport.deltaPointsFromPixels(e.delta);
        overlay.update({ location: overlay.location.plus(delta) });
        overlay.drawHTML(viewer.overlaysContainer, viewer.viewport);
      }
    });

    // Cleanup (componentWillUnmount)
    return () => {
      mouseTracker3.destroy();
      mouseTracker2.destroy();
      mouseTracker1.destroy();
      consoleHook.destroy();
      consoleHook = null;
      viewer.destroy();
      viewer = null;
    };
  }, []);

  const consoleListContainerRef = useRef(null);

  const handleClearConsoleRows = useCallback(() => {
    if (consoleRows.length > 0) {
      setconsoleRows([]);
    }
  }, [consoleRows]);

  useEffect(() => {
    // Scroll added item into view
    if (consoleRows.length > 0 && consoleListContainerRef.current) {
      consoleListContainerRef.current.scrollTop =
        consoleListContainerRef.current.scrollHeight;
    }
  }, [consoleRows]);

  return (
    // <Row className="mousetracker-page">
    //   <Col md={12} xs={12}>
    //     <Container fluid className="viewer-pane">
    //       <Row>
    //         <Col className="viewer-container">
    //           <div id="seadragon-viewer" className="seadragon-viewer" />
    //           <div
    //             className={overlay1Selected ? 'selected' : ''}
    //             id="overlay1"
    //             ref={overlay1Ref}
    //           >
    //             <p>Click to Toggle Color</p>
    //             <p>
    //               <a
    //                 href="http://openseadragon.github.io"
    //                 target="_blank"
    //                 rel="noreferrer"
    //               >
    //                 I&apos;m a link!
    //               </a>
    //             </p>
    //           </div>
    //           <div id="overlay2" ref={overlay2Ref}>
    //             <p>Can&apos;t Drag Me</p>
    //           </div>
    //           <div id="overlay3" ref={overlay3Ref}>
    //             <p>Drag Me!</p>
    //           </div>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </Col>
    // </Row>
    <Row className="mousetracker-page">
      <Col md={9} xs={12}>
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
                    href="http://openseadragon.github.io"
                    target="_blank"
                    rel="noreferrer"
                  >
                    I&apos;m a link!
                  </a>
                </p>
              </div>
              <div id="overlay2" ref={overlay2Ref}>
                <p>Can&apos;t Drag Me</p>
              </div>
              <div id="overlay3" ref={overlay3Ref}>
                <p>Drag Me!</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Col>
      <Col md={3} xs={12}>
        <Container fluid className="console-pane">
          <Row>
            <Col className="console-tools-container">
              <ButtonToolbar
                className="console-toolbar"
                aria-label="Toolbar for console output"
              >
                <ButtonGroup
                  className="mr-2"
                  aria-label="Console output button group"
                >
                  <Button
                    type="button"
                    variant="outline-dark"
                    size="sm"
                    title="Clear Console Output"
                    onClick={handleClearConsoleRows}
                  >
                    <FontAwesomeIcon icon={['fas', 'trash-alt']} size="sm" />
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row>
            <Col
              className="console-list-container"
              ref={consoleListContainerRef}
            >
              <ConsoleList consoleRows={consoleRows} />
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

export default MouseTrackerPage;
