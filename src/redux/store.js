import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootsaga from './saga';

const sagaMiddleware=createSagaMiddleware()
const store=createStore(
   rootReducer,
   applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootsaga)
export default store