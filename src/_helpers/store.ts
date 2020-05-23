import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger, { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();
const middlewares: Array<any> = [thunkMiddleware]
if (process.env.NODE_ENV === "development") {
    middlewares.push(loggerMiddleware)

}

export const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
)