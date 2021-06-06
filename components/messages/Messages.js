import React, {useContext} from 'react';
import Modal from "../UI/Modal";
import Button from "../UI/Button";

import styles from './Messages.module.scss'
import Message from "./Message";

import {useSelector} from "react-redux";

const Messages = (props) => {

  const messages = useSelector(state=> state.messages.messages);

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles['messages-list']}>
        {messages.map(message => (
            <Message key={message.id} id = {message.id} message={message} />
          )
        )}
      </ul>
      <div className={styles.actions}>
        <Button onClick={props.onClose}>Close</Button>
      </div>
    </Modal>
  );
}

export default Messages;
