import './AuthForm.scss';
import useHttp from '../../hooks/useHttp';
import { useState, useRef } from 'react';
import { signup, signin } from '../../lib/api';

const AuthForm = () => {
  
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');

  const { sendRequest : signUpUser } = useHttp(signup);
  const { sendRequest : signInUser, data: userData, status: loginStatus } = useHttp(signin);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLogin === true) {
      signInUser({email: emailInputRef.current.value, password: passwordInputRef.current.value});
    } else {
      signUpUser({email: emailInputRef.current.value, password: passwordInputRef.current.value});
    }

    setIsLoading(false);

  };

  if (loginStatus === 'pending') {
    console.log('Performing API call now. Please wait...');
  }

  if (loginStatus === 'completed') {
    console.log('API call resolved, please check returned data...');
    console.log(userData);
  }

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

          { !isLoading && <button>{isLogin ? 'Login' : 'Create Account' }</button>  } 
          { isLoading && <p>Loading...</p> }
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
