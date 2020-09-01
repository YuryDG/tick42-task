import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../modules/app/reducers/rootReducer';

export type AppState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, applyMiddleware(logger, thunk));
