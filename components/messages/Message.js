import React from 'react';

import styles from './Message.module.scss';

const Message = ({message}) => {
  return (
    <li className={styles['message']}>
      <p>{message.id} - {message.text}</p>
    </li>
  );
};

export default Message;
