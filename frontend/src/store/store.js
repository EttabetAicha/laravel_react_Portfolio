import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const asyncMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return next(action);
};

const store = createStore(rootReducer, applyMiddleware(asyncMiddleware));

export default store;
