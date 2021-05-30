import React, {useCallback, useContext, useEffect, useState} from 'react';

let logoutTimer;

const AuthContext = React.createContext(
  {
    userName: '',
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
  });


const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {

  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (username, token, expirationTime = null) => {
    setToken(token);
    setUserName(username)
    localStorage.setItem('token', token);
    if (expirationTime) {
      localStorage.setItem('expirationTime', expirationTime);
    }

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    const tokenData = retrieveStoredToken();
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      //logoutTimer = setTimeout(logoutHandler, 5000);
      setToken(tokenData.token);
    }
  }, [token, logoutHandler]);

  const contextValue = {
    userName: userName,
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
