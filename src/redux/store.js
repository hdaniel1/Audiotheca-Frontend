import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeThunk = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducer, composeThunk)

export default store