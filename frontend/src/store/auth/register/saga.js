import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";
import { postRegister } from "../../../helpers/backend_helper";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(postRegister, user);
    if (response.status === 201) {
      yield put(registerUserSuccessful(response));
    } else {
      yield put(registerUserFailed(response));
    }
  } catch (error) {
    yield put(registerUserFailed(error.response));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
