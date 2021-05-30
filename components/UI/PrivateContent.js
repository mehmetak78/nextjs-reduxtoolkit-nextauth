import React, {Fragment, useContext, useEffect, useState} from 'react';
import AuthContext from "../../context-store/auth-context";
import {useRouter} from "next/router";


const PrivateContent = (props) => {
  const authContext = useContext(AuthContext);
  const {isLoggedIn} = authContext;

  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    setisLoaded(true)
  }, [isLoggedIn]);


  const router = useRouter();
  if (isLoaded && !isLoggedIn) {
    router.push('/login')
  }

  return (
    <Fragment>
      {isLoggedIn && props.children}
    </Fragment>
  );
}

export default PrivateContent;
