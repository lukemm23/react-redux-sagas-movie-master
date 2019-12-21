import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';




//SAGAS//
// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('GET_DETAILS', getDetailsSaga);
}

function* getMoviesSaga() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/movies'
        });
        yield put({
            type: 'SET_MOVIES',
            payload: response.data
        });
    } catch (err) {
        console.log('error fetching movies: ', err);
    }
}

function* getDetailsSaga() {
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




//REDUCERS//
const moviesReducer = (state = {items:[], selected:[]}, action) => {
    let result;
    switch (action.type) {
        case 'SET_MOVIES':
            // state.items.push(...action.payload);
            return {
                items:[...action.payload]};
            case 'GET_ITEM_MOVIE':
            console.log(state.items.length);
            result = state.items.filter (item => {
                console.log(item.title, action.payload);
                return item.title === action.payload;
            });
            console.log(action, result);
            return {
                ...state,
                selected: result
            };
        default:
            return {...state};
    }
}

const detailReducer = (state = {items:[], selected:[]}, action) => {
    console.log(action);
    let result;
    switch (action.type) {
        case 'SET_DETAILS':
            // state.items.push(...action.payload);
            return {
                items:[...action.payload]};
        case 'GET_ITEM_DETAIL':
            console.log(state.items.length);
            result = state.items.filter (item => {
                console.log(item.title, action.payload);
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
        moviesReducer,
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
