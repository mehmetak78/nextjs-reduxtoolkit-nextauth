import React, {useContext, useEffect, useState} from 'react';
import MessagesIcon from "./MessagesIcon";
import classes from './HeaderMessagesButton.module.scss'
import MessagesContext from "../../context-store/messages-context";

const HeaderMessagesButton = (props) => {

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const messagesContext = useContext(MessagesContext);
  const {messages} = messagesContext;

  const numberOfMessages = messages.length;
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump:''}`;

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout( () => {
      setBtnIsHighlighted(false)
    }, 300)

  return () => {
    clearTimeout(timer)
  }

  }, [messages]);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <MessagesIcon/>
      </span>
      <span className={classes.label}> Messages </span>
      <span className={classes.badge}> {numberOfMessages} </span>
    </button>
  );

};

export default HeaderMessagesButton;


