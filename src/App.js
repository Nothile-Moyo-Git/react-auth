import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import { useContext, useEffect } from 'react';
import React from 'react';
import './App.scss';

function App() {

  // Check if we're already logged in 
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  const token = authContext.token;
  const login = authContext.login;

  console.log(`You are currently${isLoggedIn === true ? '' : ' not'} logged in.`);

  useEffect(() => {

    // Get our current date, add 2 weeks to it and then convert it to UTC time for cookie generation to persist logins
    const date = new Date();
    date.setDate(date.getDate() + 2 * 7);
    const utcDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    const expiryDate = new Date(utcDate).toUTCString();

    if ( document.cookie ) {
      const cookie = document.cookie.split('=');
      const currentDate = new Date().toUTCString();
      console.log(cookie);

      if(currentDate > cookie[2]){

      }
      // login(cookie[1]);

    }

    if ( typeof(token) === 'string') {
      document.cookie = `token=${token}, expires=${expiryDate}, path=/`;
    }

  });

  return (
    <Layout>
      <Switch>

        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route exact path='/auth'>
          { isLoggedIn === true ? <Redirect to="/profile"/> : <AuthPage/> }
        </Route>

        <Route exact path='/profile'>
          { isLoggedIn === true ? <UserProfile/> : <Redirect to="/auth"/> }
        </Route>
        
        <Redirect from="*" to="/"/>

      </Switch>
    </Layout>
  );
}

export default React.memo(App);
