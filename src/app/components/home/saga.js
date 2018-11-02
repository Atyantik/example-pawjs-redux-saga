import { put, takeEvery } from 'redux-saga/effects'
import { INCREMENT_COUNT, DECREMENT_COUNT } from './reducer';
const delay = (ms) => new Promise(res => setTimeout(res, ms));
export function* incrementAsync() {
    yield delay(1000);
    yield put({ type: INCREMENT_COUNT })
}

export function* decrementAsync() {
    yield delay(1000);
    yield put({ type: DECREMENT_COUNT })
}

export default function* rootSaga() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
    yield takeEvery('DECREMENT_ASYNC', decrementAsync);
}
