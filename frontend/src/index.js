import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { AuthContextProvide } from './context/authContext';
import {BrowserRouter as Router  } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvide>
    <Router>
      <App />
    </Router>
  </AuthContextProvide>
);

