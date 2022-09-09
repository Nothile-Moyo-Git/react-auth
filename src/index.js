import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './Index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/react-auth">
    <App />
  </BrowserRouter>
);
