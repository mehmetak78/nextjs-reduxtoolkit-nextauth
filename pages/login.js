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
import {fetchLoginSignup} from "../helpers/AuthHelpers";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthContext from "../context-store/auth-context";


const LoginPage = (props) => {
  const username = useInput('text', 'name', 'User Name', (value) => value.trim() !== '')
  const password = useInput('text', 'password', 'Password', (value) => value.trim() !== '')

  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const {sendRequest, status, data, error} = useHttp(fetchLoginSignup);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authContext.login(data.idToken, expirationTime.toISOString());
        router.push('/')
        notificationCtx.showNotification({
                                           title: 'Success!',
                                           message: 'Successfull Login',
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
      loginOrSignup: 'login',
      username: username.value,
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
          <Input inputHook={username}/>
          <Input inputHook={password}/>
        </div>
        <div className={styles["form-actions"]}>
          <Button styletype='btn2' type='button' onClick={cancelHandler}>Cancel</Button>
          <Button>Login</Button>
        </div>
        {status === 'pending' && <LoadingSpinner/>}
      </Card>
    </Form>
  );
}

export default LoginPage;
