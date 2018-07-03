
import {createStore, combineReducers, applyMiddleware} from 'redux';
import undoable  from 'redux-undo';
import {createLogger} from 'redux-logger';

import {reducer} from '../reducers';

let store;

if(__DEV__){
    const logger = createLogger();
    const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
    store = createStoreWithMiddleware(undoable(reducer));
} else {   
    store = createStore(undoable(reducer));
}

// combineReducers({
//     reducer: undoable(reducer)
// })

export default store;