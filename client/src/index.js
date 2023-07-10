import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index';
// import dotenv from 'dotenv';
import axios from 'axios';
// dotenv.config()

// axios.defaults.baseURL = REACT_APP_API || "http://localhost:3001"
axios.defaults.baseURL = "https://video-games-pi-henry-api.vercel.app"


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
