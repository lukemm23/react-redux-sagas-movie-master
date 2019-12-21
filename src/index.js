import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
// Provider allows us to use redux within our react app
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call} from 'redux-saga/effects';



//SAGAS//
// Create the rootSaga generator function
function* rootSaga() {
    // yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('GET_DETAILS', getDetailsSaga);
    yield takeEvery('SUBMIT', editSaga);
}

function* getDetailsSaga(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/movies/details'
        });
        yield put({
            type: 'SET_DETAILS',
            payload: response.data
        });
    } catch (err) {
        console.log('error fetching movies: ', err);
    }
}

function* editSaga(action) {
    try {
         yield axios({
            method: 'PUT',
            url: '/api/movies/' + action.payload.id,
            data: {title: action.payload.title,
            description: action.payload.description}
        });
        yield call(getDetailsSaga);
        yield put ({
            type: 'GET_ITEM_DETAIL',
            payload: action.payload.title
        })
        yield call(action.payload.callBack);
       
    } catch (err) {
        console.log('error fetching movies: ', err);
    }
}


//REDUCER//
const detailReducer = (state = {items:[], selected:[]}, action) => {
    console.log(action);
    let result;
    switch (action.type) {
        case 'SET_DETAILS':
            return {
                items:[...action.payload]};
        case 'GET_ITEM_DETAIL':
            console.log(state.items.length);
            result = state.items.filter (item => {
                // console.log(item.title, action.payload);
                return item.title === action.payload;
            });
            console.log(action, result);
            return {
                ...state,
                selected: result
            };
        default: return {...state};
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        // moviesReducer,
        detailReducer
        // genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
document.getElementById('root'));
registerServiceWorker();
