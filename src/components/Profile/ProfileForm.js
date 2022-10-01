import './ProfileForm.scss';
import useHttp from '../../hooks/useHttp';
import { updateAccountInformation } from '../../lib/api';
import AuthContext from '../../store/auth-context';
import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {

  const { sendRequest } = useHttp(updateAccountInformation);

  const passwordRef = useRef('');
  const emailRef = useRef('');

  const history = useHistory();

  const authContext = useContext(AuthContext);

  const submitFormHandler = (event) => {

    event.preventDefault();
    
    sendRequest({ idToken: authContext.token, password: passwordRef.current.value, email: emailRef.current.value, returnSecureToken: true });

    alert(`Your profile information has been updated!`);
    history.replace('/');

  }

  return (
    <>
      <form className="form" onSubmit={submitFormHandler}>

        <div className="control">
          <label htmlFor='new-email'>New Email Address</label>
          <input 
            type='email' 
            id='new-email'
            minLength="6"
            autoComplete='on'
            placeholder="Please enter your new email address"
            ref={emailRef} 
          />
        </div>

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
        
        <div className="action">
          <button>Update Account</button>
        </div>

      </form>
    </>
  );
}

export default ProfileForm;
