const FIREBASE_AUTH_DOMAIN = 'https://identitytoolkit.googleapis.com/';

let url;

export async function fetchAuth(userData) {

  let dataForFetch;

  switch (userData.authType) {
    case 'signup' : {
      url = FIREBASE_AUTH_DOMAIN + '/v1/accounts:signUp?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';
      dataForFetch = {
        email: userData.username,
        password: userData.password,
        returnSecureToken: true
      }
      break;
    }
    case 'changepassword' : {
      url = FIREBASE_AUTH_DOMAIN + '/v1/accounts:update?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';
      dataForFetch = {
        idToken: userData.token,
        password: userData.password,
        returnSecureToken: false
      }
      break;
    }
    default : {
      url = FIREBASE_AUTH_DOMAIN + '/v1/accounts:signInWithPassword?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';
      dataForFetch = {
        email: userData.username,
        password: userData.password,
        returnSecureToken: true
      }
      break;
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(dataForFetch),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong ');
  }

  return data;
}
