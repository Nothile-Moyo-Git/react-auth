import { useState } from 'react';

import './AuthForm.scss';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className="auth">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className="control">
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className="control">
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
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
