import React, { useState, useEffect, PureComponent, createContext } from 'react'
import Axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,  PieChart, Pie, } from 'recharts';
import { render } from '@testing-library/react';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import "./SalesChart.css";
import MoneyIcon from '@mui/icons-material/Money';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Typography from '@mui/material/Typography';

function SalesChart()  {

  //Init State Dates
  const [start_date, setSelectedDate] = useState(new Date('2022-03-05').toISOString().substring(0, 10));
  const [endDate, setEndDate] = useState(new Date("2022-03-30").toISOString().substring(0, 10));
  
  //Handle Date Changes
  const handleDateChange = (date) => {
    console.log(date)

    console.log(date.toISOString().substring(0, 10)-1)
    console.log(date.toISOString().substring(0, 10))
    setSelectedDate(date.toISOString().substring(0, 10));

  };

  const handleEndChange = (date) => {
    console.log(date);
    setEndDate(date.toISOString().substring(0, 10));
  };

//Init State
const [sales, setSalesData] = useState([]); //init empty object
const [products, setProductList] = useState([]); //init empty object, pulling an object
const [mostSold, setSold] = useState([]);

//Product List Endpoint
var productURL = "https://lit-thicket-36026.herokuapp.com/v1/products"

//HTTP Get Request Product List
useEffect(() => {
  const fetchData = async () => {
    const return_product = await Axios.get(productURL,
      {auth: {
      username: "exercise",
      password: "Cj08f6xnM2ApnGIjbHACnJhcldNPET2q"
  }},
  )  
      setProductList(return_product.data)
  };  
  fetchData();
}, []);



//HTTP Get Request Sales Data
let mostSales =[];
useEffect(() => {

  const fetchData = async () => {
    const return_sales = await Axios.get(`https://lit-thicket-36026.herokuapp.com/v1/sales?start_date=${start_date}&end_date=${endDate}`,
      {auth: {
        username: "exercise",
        password: "Cj08f6xnM2ApnGIjbHACnJhcldNPET2q"
      }}, )

//Adds "name" prop into Sales DATA
return_sales.data.data.forEach(obj => {
//Uses names from product array to name sales products
  const elementInArr2 = products.data.find((o) => o.product_id === obj.product_id ); 
    for(let i = 0; i < products.data.length; i ++){
      if(obj.product_id === products.data[i].product_id){
        //console.log(true)
        obj.name = products.data[i].name
      }
    }
});   

//Modify Sales Date Prop For Graphing
  return_sales.data.data.forEach(obj => {
    obj.order_date = obj.order_date.substr(0,10);
  })

  return_sales.data.data.sort(function compare(a, b) {
    var dateA = new Date(a.order_date);
    var dateB = new Date(b.order_date);
    return dateA - dateB;
  });

  let dates = []

  for(let x = 0; x < return_sales.data.data.length; x++){
    let temp = return_sales.data.data[x].order_date;
    dates.push(temp)

  } 

//Modify products data to add key for total items sold.
//Loops through sales array of objects looking for items sold and captures sales
products.data.forEach(obj => {

  let product_sales = 0;
  return_sales.data.data.forEach (salesObj => {
    if(obj.name === salesObj.name){
      product_sales += salesObj.total_price_usd;
    
    }
  })
  obj.totalsold = product_sales
  product_sales = 0;
})

//Sorts Product Data For Most Sold
products.data.sort((a,b) => {
  return b.totalsold - a.totalsold;
});

setSold(products.data.splice(0,10))
console.log(mostSold)

//Gets Unique Dates For Graph
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let unique_dates = dates.filter(onlyUnique)
  let costperDay = [];

  for(let i = 0; i < unique_dates.length; i++){
  let total = 0;
  return_sales.data.data.forEach(obj => {
    if(unique_dates[i] === obj.order_date){
      total += obj.total_price_usd;
    }
  }
  )
  costperDay.push(total)
  total = 0;
  }

//Creating new array of objects using uniquedates & total sales
const total_sales = unique_dates.map((id, index) => {
  let salesObject = {};
  
  salesObject.date_order = unique_dates[index]
  salesObject.total_sales = costperDay[index]

  return salesObject;
})
      setSalesData(total_sales)
  };
  fetchData();

}, [products, start_date, endDate]);

//Calculate Total Sales
console.log(sales)
var total_sales = 0;

sales.forEach ( obj => {
  total_sales += obj.total_sales
}
)
console.log(total_sales)

var count = 0;
sales.forEach (obj => {
  count++;
})

//Calculate Average Sales
var average_sales = total_sales/count;
average_sales = average_sales.toFixed(2);

//PIE CHART
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#f5b494','#94a5f5','#fef500','#aaa6a4','#dde9f8','#c96868'];

return (
<div className="container">
<div className="bar-container">
<Grid container spacing={2} direction="column"> 
  <Grid item xs={12}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      label="Material Date Picker"
      value={start_date}
      onChange={handleDateChange}
      margin='normal'
    />
    </MuiPickersUtilsProvider>

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      label="Material Date Picker"
      value={endDate}
      onChange={handleEndChange}
      margin='normal'
    />

    </MuiPickersUtilsProvider>
    </Grid>
    <Grid item xs = {12}>

    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${total_sales}    </span>
          <span className="featuredIcon">   <MoneyIcon className="moneyIcon" /> </span>
        </div>
        <span className="featuredSub">Between {start_date.substring(5, 10)} to {endDate.substring(5, 10)} </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Quantity Sold </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">100</span> 
          <span className="featuredIcon">
             <ShoppingCartIcon className="featuredIcon Cart"/>
          </span>
        </div>
        <span className="featuredSub">Between {start_date.substring(5, 10)} to {endDate.substring(5, 10)}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Average Sales Per Day</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${average_sales}</span>
          <span className="featuredIcon">
            <CalendarTodayIcon className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Between {start_date.substring(5, 10)} to {endDate.substring(5, 10)}</span>
      </div>
    </div>

    </Grid>
  <Grid item xs = {12}> 
        <div className="barchart">
        <ResponsiveContainer width ="90%"  aspect={1.7}> 
        <BarChart
          width={100}
          height={300}
          //data={total_sales}
          data={sales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom:130,
          }}        > 
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date_order" textAnchor= "end" sclaeToFit="true" verticalAnchor= "start" interval={0} angle= "-40" stroke="#8884d8" fontSize={15}  />
          <YAxis dataKey="total_sales" />
          <Tooltip />
          <Bar dataKey="total_sales"  fill="#7075ED" />
        </BarChart>
        </ResponsiveContainer>
        </div>
    </Grid>
    </Grid>

    </div>
    <div className="pie-container">
    <div className ="pie">
    <Grid item xs ={10}> 
    <ResponsiveContainer width="100%" aspect={1}> 
        <PieChart width={150} height={150}>
          <Pie 
          data={mostSold} 
          cx="50%"
          cy="50%"
          dataKey="totalsold" 
          outerRadius={150} 
          fontSize={1}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index
          }) => {
            console.log("handling label?");
            const RADIAN = Math.PI / 180;
            // eslint-disable-next-line
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            // eslint-disable-next-line
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            // eslint-disable-next-line
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            return (
              <text
                x={x}
                y={y}
                fontSize={10}
                fill="#8884d8"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {mostSold[index].name} ({value})
              </text>
            );
          
            }}
          >
          {mostSold.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        </ResponsiveContainer>
      </Grid>
    <div>
      <div>
      </div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Top 10 Products
          </Typography>
          
        {mostSold.map(obj => {
          return (

            <div className ="top10">
            <ListItem autoFocus={true}>
            <ListItemText primary={obj.name}/>
            </ListItem>
            </div>
          )
        })}
    </div>

      </div>

    </div>

  </div>

  ); 
}
export default SalesChart;

