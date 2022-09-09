import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import './App.scss';

function App() {
  return (
    <Layout>
      <Switch>

        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route exact path='/auth'>
          <AuthPage />
        </Route>

        <Route exact path='/profile'>
          <UserProfile />
        </Route>
        
        <Redirect from="/*" to="/"/>
      </Switch>
    </Layout>
  );
}

export default App;
