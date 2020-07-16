import React, { useState, useRef, useEffect, useCallback } from 'react';
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
		<div className="console-hook-page row">
			<div className="col-md-9">
				<div className="container viewer-pane">
					{/* <div className="row">
						<div className="col viewer-tools-container">
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
						</div>
					</div> */}
					<div className="row">
						<div className="col viewer-container">
							<OsdViewer addConsoleRow={handleAddConsoleRow} />
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-3">
				<div className="container console-pane">
					<div className="row">
						<div className="col console-tools-container">
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
										<FontAwesomeIcon
											icon={['fas', 'trash-alt']}
											size="sm"
										/>
									</Button>
								</ButtonGroup>
							</ButtonToolbar>
						</div>
					</div>
					<div className="row">
						<div
							className="col console-list-container"
							ref={consoleListContainerRef}
						>
							<ConsoleList consoleRows={consoleRows} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConsoleHookPage;
