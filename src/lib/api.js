const API_KEY = 'AIzaSyAYXAdcf_s0BeI64VcVenlrX1CObah6frI';
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const CHANGE_PASSWORD_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const CHANGE_EMAIL_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

export async function signup({email, password}) {
  
  // Send a signup call to the signup url for firebase
  const response = await fetch(`${SIGNUP_URL}`,{
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {

    let errorMessage = 'Authentication failed!';
    const errorList = [`Warning!`];

    if (data && data.error && data.error.message) {
      
      data.error.errors.forEach((error) => {

        let splice = error.message.split(' ');
        const message = splice[0];

        if (message === 'WEAK_PASSWORD') {
          errorMessage = `Your password should be more than 6 letters`;
          errorList.push(errorMessage);
        }

        if (message === 'EMAIL_EXISTS') {
          errorMessage = `This email address already exists`;
          errorList.push(errorMessage);
        }

      });
    }

    alert(errorList.join('\n'));
  }

  return data;

}

export const signin = async ({email, password}) => {

  const response = await fetch(`${SIGNIN_URL}`,{
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  const errorList = [`Warning!`];

  if (!response.ok) {

    let errorMessage = 'Authentication failed!';

    if (data && data.error && data.error.message) {
      
      data.error.errors.forEach((error) => {

        let splice = error.message.split(' ');
        const message = splice[0];

        if (message === 'INVALID_PASSWORD') {
          errorMessage = `Please enter a valid password`;
          errorList.push(errorMessage);
        }

        if (message === 'EMAIL_NOT_FOUND') {
          errorMessage = `Email address is not found`;
          errorList.push(errorMessage);
        }

      });
    }

    alert(errorList.join('\n'));

  }

  if (response.ok) {
    console.log('Successfully logged in...');
    return data;
  }

}

export const changePassword = async ({idToken, password: newPassword, returnSecureToken}) => {

  if (idToken != null) {

    const password = await fetch(CHANGE_PASSWORD_URL,{
      method: 'POST',
      body: JSON.stringify({
        idToken: idToken,
        password: newPassword,
        returnSecureToken: returnSecureToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!password.ok) {
      alert(`Password update failed, please try again...`);
    }

    if (password.ok) {
      console.log('Password changed successful...');
    }

  }

}

export const updateAccountInformation = async ({idToken, email: newEmail, password: newPassword, returnSecureToken}) => {

  if (idToken != null) {

    const response = await fetch(CHANGE_EMAIL_URL,{
      method: 'POST',
      body: JSON.stringify({
        idToken: idToken,
        email: newEmail,
        password: newPassword,
        returnSecureToken: returnSecureToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      alert(`Content update failed, please check api calls...`);
    }

    if (response.ok) {
      console.log('Content update was successful...');
    }

  }

}
