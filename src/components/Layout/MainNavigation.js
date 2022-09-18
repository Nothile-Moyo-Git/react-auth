import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './MainNavigation.scss';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {

  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;

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
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
