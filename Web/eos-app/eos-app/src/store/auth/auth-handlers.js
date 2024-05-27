import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { logOut, saveToken } from "utils/auth";
import {
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthRefreshToken,
  requestAuthRegister,
} from "./auth-requests";
import { authUpdateUser } from "./auth-slice";

export default function* handleAuthRegister(action) {
  const { payload } = action;
  try {
    const response = yield call(requestAuthRegister, payload);
    console.log("🚀 ~ function*handleAuthRegister ~ response:", response);
    if (response.status === 201) {
      toast.success("Created new account successfully");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
}
function* handleAuthLogin({ payload }) {
  console.log(payload);
  try {
    const response = yield call(requestAuthLogin, payload);
    if (response.data.token) {
      saveToken(response.data.token);
      yield call(handleAuthFetchMe, { payload: response.data.token });
    }
  } catch (error) {
    const response = error.response;
    if (response.status === 403 || response.status === 400) {
      toast.error(response.data.message);
      return;
    }
  }
}

function* handleAuthFetchMe({ payload }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);

    if (response.status === 200) {
      yield put(
        authUpdateUser({
          user: response.data,
          accessToken: payload,
        })
      );
    }
    // response.data -> userInfo
  } catch (error) {
    console.log(error);
  }
}

function* handleAuthRefreshToken({ payload }) {
  try {
    const response = yield call(requestAuthRefreshToken, payload);
    if (response.data) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, {
        payload: response.data.accessToken,
      });
    } else {
      yield handleAuthLogOut();
    }
  } catch (error) {}
}

function* handleAuthLogOut() {
  console.log("Click");
  yield put(
    authUpdateUser({
      user: undefined,
      accessToken: null,
    })
  );
  logOut();
}

export {
  handleAuthLogin,
  handleAuthFetchMe,
  handleAuthRefreshToken,
  handleAuthLogOut,
};
