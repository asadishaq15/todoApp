import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Routes';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import ProfileForm from './components/profileForm';
import UserProfile from './components/userProfile';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
        
           <App /> 
    
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
