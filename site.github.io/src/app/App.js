import React from 'react'; //, { useState }
import PropTypes from 'prop-types';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.scss';
import HomePage from '../page-home/HomePage';
import ConsoleHookPage from '../page-consolehook/ConsoleHookPage';
import ImagingHelperPage from '../page-imaginghelper/ImagingHelperPage';
import NavigatorPage from '../page-navigator/NavigatorPage';

const appTitle = 'OpenSeadragon Imaging';

NavBar.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

function NavBar(props) {
	//const { match, location, history } = props;
	const { location } = props;
	return (
		<Navbar
			collapseOnSelect
			fixed="top"
			bg="dark"
			variant="dark"
			expand="md"
		>
			<LinkContainer exact to="/">
				<Navbar.Brand href="/">{appTitle}</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav activeKey={location.pathname} className="mr-auto">
					<LinkContainer exact to="/">
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/imaginghelper">
						<Nav.Link>ImagingHelper</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/consolehook">
						<Nav.Link>ConsoleHook</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/navigator">
						<Nav.Link>Navigator</Nav.Link>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

const NavBarWithRouter = withRouter(NavBar);

function App(props) {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<header>
				<NavBarWithRouter></NavBarWithRouter>
			</header>

			<main role="main" className="flex-shrink-0">
				<Container fluid>
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/imaginghelper">
							<ImagingHelperPage />
						</Route>
						<Route path="/consolehook">
							<ConsoleHookPage />
						</Route>
						<Route path="/navigator">
							<NavigatorPage />
						</Route>
						<Route path="/">
							<Redirect to="/" />
						</Route>
					</Switch>
				</Container>
			</main>
		</Router>
	);
}

export default App;
