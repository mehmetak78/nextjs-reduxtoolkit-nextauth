import React, {Fragment, useContext, useEffect, useState} from 'react';
import classes from "./Layout.module.scss";
import Footer from "./Footer";

import Notification from "./Notification";
import Messages from "../messages/Messages";
import Header from "./Header";

import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "../../store/notificationSlice";
import {login} from "../../store/authSlice";
import useHttp from "../../hooks/use-http";
import {fetchAuth, retrieveStoredToken} from "../../helpers/AuthHelpers";

const Layout = (props) => {

  const dispatch = useDispatch();
  const notification = useSelector( state => state.notification);

  const {sendRequest, status, data, error} = useHttp(fetchAuth, true);

  const [token, setToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    const tokenData = retrieveStoredToken();
    if (tokenData) {
      setToken(tokenData.token);
      setExpirationTime(tokenData.expirationTime);
      const userData = {
        authType: 'getuserdata',
        token: tokenData.token,
      }
      console.log(userData)
      sendRequest(userData).then();
    }
  }, [sendRequest]);

  useEffect(() => {
    console.log('Layout.js / Use Effect, status:'+status)
    if (status === 'completed') {
      console.log(data)
      if (!error) {
        if (token && data && data.users && data.users[0]) {
          dispatch(login(data.users[0].email, token, expirationTime));
          dispatch(showNotification('Success!','Already Logged In','success'));
        }
      } else {
        dispatch(showNotification('Login Error', error,'error'));
      }
    }
    // eslint-disable-next-line
  }, [status]);

  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const hideMessagesHandler = () => {
    setIsMessagesOpen(false);
  }

  const showMessagesHandler = () => {
    setIsMessagesOpen(true);
  }

  return (
    <Fragment>
      <Header onShowCart={showMessagesHandler}/>
      {isMessagesOpen && <Messages onClose={hideMessagesHandler}/>}
      <main className={classes.container}>{props.children}</main>
      {notification.content.title && (
        <Notification
          title={notification.content.title}
          message={notification.content.message}
          status={notification.content.status}
        />
      )}
      <Footer />
    </Fragment>
  );
};

export default Layout;
