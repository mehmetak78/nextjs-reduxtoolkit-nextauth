import React, {Fragment, useContext, useEffect, useState} from 'react';

import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const PrivateContent = (props) => {
  const auth = useSelector(state=> state.auth);
  const {isLoggedIn} = auth;

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
