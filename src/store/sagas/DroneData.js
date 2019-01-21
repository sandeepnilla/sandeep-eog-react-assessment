import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchDrone(action) {
  const { error, data } = yield call(
    API.getDroneData,
  );
  console.log(data);
  if (error) {
    console.log({ error });
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  
  
  yield put({ type: actions.FETCH_DRONE_DATA_RECEIVED, data: data.data });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE_DATA, watchFetchDrone)
  ]);
}

export default [watchAppLoad];
