import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./authSlice";
import {notificationSlice} from "./notificationSlice";
import {messagesSlice} from "./messagesSlice";

export const store = configureStore(
  {
    reducer: {
      auth: authSlice.reducer,
      notification: notificationSlice.reducer,
      messages: messagesSlice.reducer
    }
  })

