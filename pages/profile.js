import React, {Fragment, useCallback, useContext, useEffect} from 'react';
import Card from "../components/UI/Card";
import styles from '../styles/Login.module.scss'
import Form from "../components/UI/Form";
import useInput from "../hooks/useInput";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import {useRouter} from "next/router";

import useHttp from "../hooks/use-http";
import {fetchAuth} from "../helpers/AuthHelpers";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "../store/notificationSlice";
import {login} from "../store/authSlice";
import PrivateContent from "../components/UI/PrivateContent";


const ProfilePage = (props) => {
  const password = useInput('text', 'password', 'New Password', (value) => value.trim() !== '')

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const {sendRequest, status, data, error} = useHttp(fetchAuth);

  useEffect(() => {
    if (status === 'completed') {
      if (!error) {
        dispatch(login(auth.userName, data.idToken));
        router.push('/')
        dispatch(showNotification('Success!', 'Successfull Change Password', 'success'));
      } else {
        console.log(error)
        dispatch(showNotification('Change Password Error', error, 'error'));
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
    <PrivateContent>
      <Form onSubmit={submitHandler}>
        <Card>
          <div>
            <h1>{auth.userName}</h1>
            <Input inputHook={password}/>
          </div>
          <div className={styles["form-actions"]}>
            <Button styletype='btn2' type='button' onClick={cancelHandler}>Cancel</Button>
            <Button>Change Password</Button>
          </div>
          {status === 'pending' && <LoadingSpinner/>}
        </Card>
      </Form>
    </PrivateContent>
  );
}

export default ProfilePage;
