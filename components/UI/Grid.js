import React from 'react';
import styles from './Grid.module.scss';

const Card = (props) => {
  return (
    <div className={`${styles.grid} ${props.className}`}>
      {props.children }
    </div>
  );
};

export default Card;
