import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import './MainNavigation.scss';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {

  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;

  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();

    authContext.logout();
    history.push('/auth');
  };

  return (
    <header className="header">

      <Link to='/'>
        <div className="logo">React Auth</div>
      </Link>

      <nav>
        <ul>

          { !isLoggedIn && ( 
            <li>
              <Link to='/auth'>Login</Link>
            </li> 
          )}

          { isLoggedIn && ( 
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}

          { isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}

        </ul>
      </nav>

    </header>
  );
};

export default MainNavigation;
