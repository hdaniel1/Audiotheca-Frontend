import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {default as ContentSideBar} from './components/SearchSidebar';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render( <BrowserRouter><Provider store={store}><ContentSideBar /></Provider></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
