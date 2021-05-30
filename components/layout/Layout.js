import React, {Fragment, useContext, useState} from 'react';
import classes from "./Layout.module.scss";
import Footer from "./Footer";
import NotificationContext from "../../context-store/notification-context";
import Notification from "./Notification";
import Messages from "../messages/Messages";
import Header from "./Header";

const Layout = (props) => {

  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

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
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <Footer />
    </Fragment>
  );
};

export default Layout;
