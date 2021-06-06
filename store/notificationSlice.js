import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  content: {
    title: null,
    message: null,
    status: null
  }
}

let notificationTimer;

export const notificationSlice = createSlice(
  {
    name: 'notification',
    initialState,
    reducers: {
      showNotificationAction: (state, action) => {
        state.content = action.payload
      },
      clearNotificationAction: (state) => {
        state.content = initialState.content;
      },
    }
  }
);

const {showNotificationAction, clearNotificationAction} = notificationSlice.actions;

export const clearNotification = () => (dispatch, getState) => {
  dispatch(clearNotificationAction());
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
}

export const showNotification = (title, message, status) => (dispatch, getState) => {

  dispatch(showNotificationAction({title, message, status}));

  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }

  notificationTimer = setTimeout(() => {
    dispatch(clearNotification());
  }, 3000);
}


