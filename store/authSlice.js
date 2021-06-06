import {createSlice} from "@reduxjs/toolkit";
import {calculateRemainingTime} from "../helpers/AuthHelpers";

const initialState = {
  username: null,
  token: null,
  isLoggedIn: false,
}

export const authSlice = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      loginAction: (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.username = action.payload.username;
      },
      logoutAction: (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.username = null;
      },
    }
  }
);

const {loginAction, logoutAction} = authSlice.actions;

let logoutTimer;

export const login = (username, token, expirationTime = null) => (dispatch, getState) => {
  const payload = {
    token: token,
    username: username
  }
  dispatch(loginAction(payload));
  localStorage.setItem('token', token);
  if (expirationTime) {
    localStorage.setItem('expirationTime', expirationTime);
  }
  const remainingTime = calculateRemainingTime(expirationTime);

  logoutTimer = setTimeout(() => {
    dispatch(logout());
  }, remainingTime );
};

export const logout = () => (dispatch, getState) => {
  const payload = {
    token: null,
    username: null
  }
  dispatch(logoutAction(payload));
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');

  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
}
