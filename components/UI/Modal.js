import React, {Fragment, useEffect, useRef, useState} from "react";
import ReactDOM, {createPortal} from "react-dom";
import classes from './Modal.module.css';

const Backdrop = props => {
  return (
    <div className={classes.backdrop} onClick={props.onClose}/>
  )
}

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      {props.children}
    </div>
  )
}

function Modal(props) {

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return (
      <Fragment>
        {createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("overlays"))}
        {createPortal(<ModalOverlay> {props.children}</ModalOverlay>, document.getElementById("overlays"))}
      </Fragment>
    );
  } else {
    return null;
  }



}

export default Modal;
