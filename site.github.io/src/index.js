import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faTrashAlt,
	faHandPaper,
	faHandPointer
} from '@fortawesome/free-solid-svg-icons';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

// Create a library of the FontAwesome icons we use
library.add(faTrashAlt, faHandPaper, faHandPointer);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
