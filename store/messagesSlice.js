import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  messages:
    [
      {id: 1, text: 'First Message'},
      {id: 2, text: 'Second Message'},
    ],
};

export const messagesSlice = createSlice(
  {
    name: 'messages',
    initialState,
    reducers: {
      addMessageAction: (state, action) => {
        state.messages = [...state.messages, action.payload]
      },
      removeMessageAction: (state, action) => {
        state.messages = state.messages.filter(message => message.id !== action.payload);
      },
      clearMessagesAction: (state) => {
        state.messages = initialState.messages;
      },
    }
  }
);

const {addMessageAction, removeMessageAction, clearMessagesAction} = messagesSlice.actions;

export const addMessage = (message) => (dispatch) => {
  dispatch(addMessageAction(message));
}

export const removeMessage = (message) => (dispatch) => {
  dispatch(removeMessageAction(message));
}

export const clearMessages = () => (dispatch) => {
  dispatch(clearMessagesAction());
}
