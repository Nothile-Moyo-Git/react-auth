import './ProfileForm.scss';
import useHttp from '../../hooks/useHttp';
import { changeEmail, changePassword } from '../../lib/api';
import AuthContext from '../../store/auth-context';
import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {

  const { sendRequest: updatePassword } = useHttp(changePassword);
  const { sendRequest: updateEmail } = useHttp(changeEmail);
  const [emailOrPass, setEmailOrPass] = useState('password');

  const passwordRef = useRef('');
  const emailRef = useRef('');

  const history = useHistory();

  const authContext = useContext(AuthContext);

  const submitFormHandler = (event) => {

    event.preventDefault();

    console.log(emailOrPass);
    
    emailOrPass === 'password' && updatePassword({ idToken: authContext.token, password: passwordRef.current.value, returnSecureToken: true });
    emailOrPass === 'email' && updateEmail({ idToken: authContext.token, email: emailRef.current.value, returnSecureToken: true})

    alert(`Your profile information has been updated!`);
    history.replace('/');

  }

  const updateFormDisplay = (event) => {

    event.preventDefault();

    setEmailOrPass((previousState) => {

      if(previousState === 'password'){
        return 'email';
      }else{
        return 'password';
      }

    });

  }

  return (
    <>
      <form className="form" onSubmit={submitFormHandler}>

        {
          emailOrPass === 'email' &&
          <div className="control">
            <label htmlFor=''>New Email Address</label>
            <input
              type='email'
              id='new-email'
              autoComplete='on'
              placeholder="Please enter your new email address"
              ref={emailRef}
            />
          </div>
        }

        {  
          emailOrPass === 'password' &&
          <div className="control">
            <label htmlFor='new-password'>New Password</label>
            <input 
              type='password' 
              id='new-password'
              minLength="6"
              autoComplete='on'
              placeholder="Please enter your new password"
              ref={passwordRef} 
            />
          </div>
        }

        <div className="action">
          <button>Update</button>
        </div>

      </form>
      <button onClick={updateFormDisplay}>{emailOrPass === 'email' ? 'Change Password' : 'Change Email Address'}</button>
    </>
  );
}

export default ProfileForm;
