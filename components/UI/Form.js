import React from 'react';
import styles from './Card.module.scss';

const Form = (props) => {
  return (
    <form
      className={`${styles.form} ${props.className}`}
      onSubmit={props.onSubmit}
    >
      {props.children }
    </form>
  );
};

export default Form;
