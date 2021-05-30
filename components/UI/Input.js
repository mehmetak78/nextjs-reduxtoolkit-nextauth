import React, {forwardRef} from 'react';
import styles from "./Input.module.css";

const Input = (props) => {

  const {inputHook} = props;

  const hookClasses = inputHook.hasError ? `${styles['form-control']} {classes.invalid}` : styles['form-control'];

  return (
    <div className={styles['control-group']}>
      <div className={hookClasses}>
        <label htmlFor='name'>{inputHook.label}</label>
        <input
          type={inputHook.type}
          id={inputHook.id}
          value={inputHook.value}
          onChange={inputHook.changeHandler}
          onBlur={inputHook.blurHandler}
        />
        {inputHook.hasError && <p className={styles["error-text"]}>Please enter a valid name.</p>}
      </div>
    </div>
  );
};

export default Input;

