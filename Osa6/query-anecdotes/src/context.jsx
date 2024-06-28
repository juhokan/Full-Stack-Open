import PropTypes from 'prop-types';
import { createContext, useReducer } from "react";

const messageReducer = (state, action) => {
  switch (action.type) {
    case "MESSAGE":
      return action.payload;
    case "RESET":
      return null;
    default:
      return state;
  }
};

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, "");

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  );
};

MessageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MessageContext;