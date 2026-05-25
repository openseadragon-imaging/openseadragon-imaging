import React, { useState, useRef, useEffect, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ConsoleHookPage.scss';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
//import ToggleButton from 'react-bootstrap/ToggleButton';
import OsdViewer from './OsdViewer';
import ConsoleList from './ConsoleList';

function ConsoleHookPage(props) {
  const [consoleRows, setconsoleRows] = useState([]);

  const consoleListContainerRef = useRef(null);

  const handleAddConsoleRow = useCallback(
    (rowObj) => {
      setconsoleRows((prevConsoleRows) => {
        return prevConsoleRows.concat(rowObj);
      });
    },
    [setconsoleRows]
  );

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
    <Row className="console-hook-page">
      <Col md={9} xs={12}>
        <Container fluid className="viewer-pane">
          {/* <Row>
						<Col className="viewer-tools-container">
							<ButtonToolbar
								className="viewer-toolbar"
								aria-label="Toolbar for viewer"
							>
								<ToggleButtonGroup
									className="mr-2"
									type="radio"
									name="cursormodes"
									defaultValue={1}
									aria-label="Viewer button group"
								>
									<ToggleButton
										value={1}
										type="button"
										variant="outline-dark"
										size="sm"
										title="Pan Image"
									>
										<FontAwesomeIcon
											icon={['fas', 'hand-paper']}
											size="sm"
										/>
									</ToggleButton>
									<ToggleButton
										value={2}
										type="button"
										variant="outline-dark"
										size="sm"
										title="Edit Annotations"
									>
										<FontAwesomeIcon
											icon={['fas', 'hand-pointer']}
											size="sm"
										/>
									</ToggleButton>
								</ToggleButtonGroup>
							</ButtonToolbar>
						</Col>
					</Row> */}
          <Row>
            <Col className="viewer-container">
              <OsdViewer addConsoleRow={handleAddConsoleRow} />
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

export default ConsoleHookPage;
