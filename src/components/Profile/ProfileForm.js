import './ProfileForm.scss';
import useHttp from '../../hooks/useHttp';
import { changePassword } from '../../lib/api';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';

const ProfileForm = () => {

  const { sendRequest , status, data, error } = useHttp(changePassword);

  const authContext = useContext(AuthContext);

  const submitFormHandler = (event) => {
    event.preventDefault();

    sendRequest({ idToken: authContext.token, password: authContext.password, returnSecureToken: true });
  }

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <div className="control">
        <label htmlFor='new-password'>New Password</label>
        <input 
          type='password' 
          id='new-password'
          autoComplete='on' 
        />
      </div>
      <div className="action">
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
