import { call, put, takeLatest } from 'redux-saga/effects';
import fetchHotelsServer from '../../../api/hotels/hotels';

export function* fetchHotels(action) {
  try {
    const { destination } = action.payload || {};
    const hotels = yield call(fetchHotelsServer);

    const filtered = destination
      ? hotels.filter((h) => h.city === destination)
      : hotels;

    yield put({ type: "HOTELS_FETCH_SUCCEEDED", payload: filtered });
  } catch (e) {
    yield put({ type: "HOTELS_FETCH_FAILED", message: e.message });
  }
}

function* hotelsSaga() {
  yield takeLatest('HOTELS_FETCH_REQUESTED', fetchHotels)
}

export default hotelsSaga;