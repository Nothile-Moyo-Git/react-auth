import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './Index.scss';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <BrowserRouter basename="/react-auth">
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
