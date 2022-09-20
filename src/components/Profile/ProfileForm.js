import './ProfileForm.scss';
import useHttp from '../../hooks/useHttp';
import { changePassword } from '../../lib/api';
import AuthContext from '../../store/auth-context';
import { useContext, useRef, useEffect } from 'react';

const ProfileForm = () => {

  const { sendRequest , status, data } = useHttp(changePassword);
  const passwordRef = useRef('');

  const authContext = useContext(AuthContext);

  const submitFormHandler = (event) => {
    event.preventDefault();

    sendRequest({ idToken: authContext.token, password: passwordRef.current.value, returnSecureToken: true });
  }

  useEffect(() => {

    console.log('Status updated');
    console.log(status);
    console.log('Data updated');
    console.log(data, `\n\n`);

  },[status, data]);

  return (
    <form className="form" onSubmit={submitFormHandler}>

      <div className="control">
        <label htmlFor='new-password'>New Password</label>
        <input 
          type='password' 
          id='new-password'
          autoComplete='on'
          placeholder="Please enter your new password"
          ref={passwordRef} 
        />
      </div>

      <div className="action">
        <button>Change Password</button>
      </div>

    </form>
  );
}

export default ProfileForm;
