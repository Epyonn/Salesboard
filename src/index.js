import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOR0PpS0uzE7jVzVXan_89wgZWC9x0L7Q",
  authDomain: "dashboard-45726.firebaseapp.com",
  projectId: "dashboard-45726",
  storageBucket: "dashboard-45726.appspot.com",
  messagingSenderId: "66254087466",
  appId: "1:66254087466:web:a3ecd70b6514128c5caa53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
