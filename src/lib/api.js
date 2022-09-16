const API_KEY = 'AIzaSyAYXAdcf_s0BeI64VcVenlrX1CObah6frI';
// const FIREBASE_DOMAIN = 'https://react-auth-48dea-default-rtdb.europe-west1.firebasedatabase.app/';
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export async function signup({email, password}) {
  
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
          errorMessage = `Your password should be more than 6 letters`;
          errorList.push(errorMessage);
        }

        if (message === 'EMAIL_NOT_FOUND') {
          errorMessage = `Email address is not found`;
          errorList.push(errorMessage);
        }

      });
    }

    console.log(errorList.join('\n'));

  }

  if (response.ok) {
    return data;
  }

}

