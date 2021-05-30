import {createContext, useReducer} from "react";

const MessagesContext = createContext(
  {
    messages: [],
    addMessage: (message) => {
    },
    removeMessage: (id) => {
    },
    clearMessages: () => {
    }
  });

const ACTION_TYPES = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR'
}

const initialState = {
  messages:
    [
      {id: 1, text: 'First Message'},
      {id: 2, text: 'Second Message'},
    ],
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      return [...state, action.payload]
    }
    case ACTION_TYPES.REMOVE: {
      const updatedMessages = state.messages.filter(message => message.id !== action.payload);
      return {
        messages: updatedMessages,
      }
    }
    case ACTION_TYPES.CLEAR: {
      return initialState;
    }
    default:
      return state;
  }
}

export const MessagesContextProvider = (props) => {

  const [state, dispatch] = useReducer(messageReducer, initialState);

  const addMessageHandler = message => {
    dispatch({type: ACTION_TYPES.ADD, payload: message});
  };

  const removeMessageHandler = id => {
    dispatch({type: ACTION_TYPES.REMOVE, payload: id})
  };

  const clearMessagesHandler = () => {
    dispatch({type: ACTION_TYPES.CLEAR, payload: {}})
  };

  const messagesContext = {
    messages: state.messages,
    addMessage: addMessageHandler,
    removeMessage: removeMessageHandler,
    clearMessages: clearMessagesHandler
  }

  return (
    <MessagesContext.Provider value={messagesContext}>
      {props.children}
    </MessagesContext.Provider>
  );
};


export default MessagesContext;
