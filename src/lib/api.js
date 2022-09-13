const API_KEY = 'AIzaSyAYXAdcf_s0BeI64VcVenlrX1CObah6frI';
const FIREBASE_DOMAIN = 'https://react-auth-48dea-default-rtdb.europe-west1.firebasedatabase.app/';
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

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
    console.log(`Error : ${data.error.code}. ${data.error.message}`);
  }

  if (response.ok) {
    console.log(data);
    console.log(response);
    console.log('Call successful, returning data now...');
  } 




  return data;

}

