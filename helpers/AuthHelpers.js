const FIREBASE_AUTH_DOMAIN = 'https://identitytoolkit.googleapis.com/';

let url;

export async function fetchLogin(loginData) {
  url = FIREBASE_AUTH_DOMAIN + '/v1/accounts:signInWithPassword?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';
  const loginDataForFetch = {
    email: loginData.username,
    password: loginData.password,
    returnSecureToken: true
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(loginDataForFetch),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Wrong username/password.');
  }

  return data;
}
