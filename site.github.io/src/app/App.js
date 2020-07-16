import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.scss';
import HomePage from '../page-home/HomePage';
import ConsoleHookPage from '../page-consolehook/ConsoleHookPage';
import ImagingHelperPage from '../page-imaginghelper/ImagingHelperPage';

const appTitle = 'OpenSeadragon Imaging';
const appDesc = ''; //'Viewer'

function App(props) {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<div>
				<header>
					<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
						<a className="navbar-brand" href="/">
							{appTitle}
						</a>
						<span className="navbar-text">{appDesc}</span>
					</nav>
				</header>

				<main role="main" className="flex-shrink-0">
					<div className="container-fluid">
						<Switch>
							<Route path="/home">
								<HomePage />
							</Route>
							<Route path="/imaginghelper">
								<ImagingHelperPage />
							</Route>
							<Route path="/consolehook">
								<ConsoleHookPage />
							</Route>
							<Route path="/">
								<Redirect to="/home" />
							</Route>
						</Switch>
					</div>
				</main>
			</div>
		</Router>
	);
}

export default App;
