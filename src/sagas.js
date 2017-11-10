import {takeEvery, put, call, select} from 'redux-saga/effects';
import * as weatherActions from './actions/actions';
import {configs} from './configs';

import axios from 'axios';

// import PouchDB from 'pouchdb-browser';
//
// const historyDB = new PouchDB('history');

// Axios default configurations
// axios.defaults.baseURL = "api.openweathermap.org/data/2.5/weather?"; // api.openweathermap.org/data/2.5/weather?lon=4.518168999999999&lat=51.9251602&units=metric&APPID=098e556d63530ebbcf175a7c39d994a6
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
// APPID
const appId = '098e556d63530ebbcf175a7c39d994a6';

function* getLocation(action) {
    // TODO fetch location, then update state

    try {
        const payload = yield call(() => {
            return new Promise((resolve, reject) => {
                // Check if browser support geolocation.
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(position => {
                        resolve({
                            lon: position.coords.longitude,
                            lat: position.coords.latitude
                        });
                    }, error => {
                        reject(error);
                    });
                } else {
                    reject('Browser does not support geolocation');
                }
            });
        });
        // console.log(payload);
        yield put(weatherActions.updateLocation(payload));
    } catch(error) {
        console.log(error);
    }
}

function* getWeather(action) {
    // TODO fetch weather based on location in state, then update state

    // console.log(action);

    const location = yield select(state => {
        return {...state.weather.location};
    });
    // console.log(location);

    // const endpoint = `lon=${location.lon}&lat=${location.lat}&units=metric&APPID=${configs.open_weather_api.key}`;
    console.log(endpoint);

    try {
        // todo: using other resource, because of Open Weather API request limitation.
        const response = yield call(axios.get, '/todos');
        yield put(weatherActions.updateWeather(response));
    } catch (error) {
        // todo: handle error
        console.log(error);
    }
}

function* weatherSaga() {
    yield takeEvery('GET_LOCATION', getLocation);
    yield takeEvery('GET_WEATHER', getWeather);
}

export default weatherSaga;