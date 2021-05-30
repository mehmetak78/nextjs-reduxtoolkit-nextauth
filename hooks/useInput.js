import { useState } from 'react';

const useInput = (type, id, label, validate) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = validate(enteredValue);
  const hasError = !isValueValid && isTouched;

  const changeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const blurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    type,
    id,
    label,
    value: enteredValue,
    isValid: isValueValid,
    hasError,
    changeHandler,
    blurHandler,
    reset
  };
};

export default useInput;
