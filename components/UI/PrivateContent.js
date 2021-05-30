import React, {Fragment, useContext, useEffect, useState} from 'react';
import AuthContext from "../../context-store/auth-context";
import {useRouter} from "next/router";


const PrivateContent = (props) => {
  const authContext = useContext(AuthContext);
  const {isLoggedIn} = authContext;

  let isLoaded = false;

  useEffect(() => {
    isLoaded = true;
    console.log('Use Effect of Private ROute')
  }, [isLoggedIn]);


  let router = null;

  if (isLoaded) {
     router = useRouter();
     if (!isLoggedIn) {
       router.push('/login')
     }
  }

  return (
    <Fragment>
      {isLoggedIn && props.children}
    </Fragment>
  );
}

export default PrivateContent;
