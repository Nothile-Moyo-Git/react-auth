import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import { useContext } from 'react';
import React from 'react';
import './App.scss';

function App() {

  // Check if we're already logged in 
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  console.log(`You are currently${isLoggedIn === true ? '' : ' not'} logged in.`);

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
