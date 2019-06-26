import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render( <BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
