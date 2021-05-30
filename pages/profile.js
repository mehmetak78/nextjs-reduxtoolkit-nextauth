import React, {Fragment, useCallback, useContext, useEffect} from 'react';
import Card from "../components/UI/Card";
import styles from '../styles/Login.module.scss'
import Form from "../components/UI/Form";
import useInput from "../hooks/useInput";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import {useRouter} from "next/router";
import NotificationContext from "../context-store/notification-context";
import useHttp from "../hooks/use-http";
import {fetchAuth} from "../helpers/AuthHelpers";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthContext from "../context-store/auth-context";


const ProfilePage = (props) => {
  const password = useInput('text', 'password', 'New Password', (value) => value.trim() !== '')

  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const {sendRequest, status, data, error} = useHttp(fetchAuth);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        authContext.login(authContext.userName, data.idToken,);
        router.push('/')
        notificationCtx.showNotification({
                                           title: 'Success!',
                                           message: 'Successfull Change Password',
                                           status: 'success',
                                         });
      } else {
        console.log(error)
        notificationCtx.showNotification({
                                           title: 'Login Error',
                                           message: error,
                                           status: 'error',
                                         });
      }
    }
  }, [status, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      authType: 'changepassword',
      token: authContext.token,
      password: password.value
    }
    sendRequest(userData);
  }

  const cancelHandler = () => {
    router.push('/')
  }

  return (
    <Form onSubmit={submitHandler}>
      <Card>
        <div>
          <h1>{authContext.userName}</h1>
          <Input inputHook={password}/>
        </div>
        <div className={styles["form-actions"]}>
          <Button styletype='btn2' type='button' onClick={cancelHandler}>Cancel</Button>
          <Button>Change Password</Button>
        </div>
        {status === 'pending' && <LoadingSpinner/>}
      </Card>
    </Form>
  );
}

export default ProfilePage;
