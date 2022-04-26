

import React, { useState, useEffect, PureComponent, createContext } from 'react'
import Axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { render } from '@testing-library/react';
import SalesChart from './Charts/SalesChart';
//Material Library
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';



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



function App()  {


return (
  <div>
    <SalesChart />
  </div>
  );
}
export default App;
