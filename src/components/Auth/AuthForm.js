import { useState, useRef } from 'react';
import './AuthForm.scss';
import useHttp from '../../hooks/useHttp';
import { signup } from '../../lib/api';

const AuthForm = () => {
  
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');
  const { sendRequest, status, data,  error } = useHttp(signup);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (isLogin === true) {

    } else {
      sendRequest({email: emailInputRef.current.value, password: passwordInputRef.current.value});
    }
  };


  return (
    <section className="auth">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>

        <div className="control">
          <label htmlFor='email'>Your Email</label>
          <input 
            type='email' 
            id='email'
            ref={emailInputRef}
            autoComplete='on'
            required 
          />
        </div>

        <div className="control">
          <label htmlFor='password'>Your Password</label>
          <input 
            type='password' 
            id='password'
            ref={passwordInputRef}
            autoComplete='on' 
            required
          />
        </div>

        <div className="actions">
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className="toggle"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>

      </form>
    </section>
  );
};

export default AuthForm;
