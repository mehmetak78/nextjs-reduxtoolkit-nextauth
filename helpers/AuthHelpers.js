const FIREBASE_AUTH_DOMAIN = 'https://identitytoolkit.googleapis.com/';

let url;

export async function fetchLoginSignup(userData) {
  url = userData.loginOrSignup === 'signup'
    ? FIREBASE_AUTH_DOMAIN + '/v1/accounts:signUp?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ'
    : FIREBASE_AUTH_DOMAIN + '/v1/accounts:signInWithPassword?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';

  const loginDataForFetch = {
    email: userData.username,
    password: userData.password,
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
    throw new Error(data.message || 'Cannot Signup.');
  }

  return data;
}
