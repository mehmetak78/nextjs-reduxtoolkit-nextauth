import React, {Fragment, useContext, useEffect, useState} from 'react';
import AuthContext from "../../context-store/auth-context";
import {useRouter} from "next/router";


const PrivateContent = (props) => {
  const authContext = useContext(AuthContext);
  const {isLoggedIn} = authContext;

  const [isLoaded, setIsLoaded] = useState(false);

  let router = null;

  if (isLoaded) {
     router = useRouter();
    console.log('Here')
     if (!isLoggedIn) {
       router.push('/login')
     }
  }

  useEffect(() => {
    setIsLoaded(true);
    console.log('Use Effect of Private ROute')
  }, [isLoggedIn]);

  return (
    <Fragment>
      {isLoggedIn && props.children}
    </Fragment>
  );
}

export default PrivateContent;
