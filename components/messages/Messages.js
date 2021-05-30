import React, {useContext} from 'react';
import Modal from "../UI/Modal";
import MessagesContext from "../../context-store/messages-context";
import Button from "../UI/Button";

import styles from './Messages.module.scss'
import Message from "./Message";

const Messages = (props) => {

  const messagesCtx = useContext(MessagesContext);
  const messages = messagesCtx.messages;

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles['messages-list']}>
        {messages.map(message => (
            <Message id = {message.id} message={message} />
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
