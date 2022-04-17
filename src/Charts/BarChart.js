
import React, { useState, useEffect, PureComponent, createContext } from 'react'
import Axios from 'axios'
/*
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer }from 'recharts';*/
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { render } from '@testing-library/react';


const ProductBarChart = () => {

//PULLS SALES DATA
var salesURL = "https://lit-thicket-36026.herokuapp.com/v1/sales?start_date=2022-02-01&end_date=2022-02-04"
const [sales, setSalesData] = useState([]); //init empty object


//PULLS PRODUCT LIST
var productURL = "https://lit-thicket-36026.herokuapp.com/v1/products"
const [products, setProductList] = useState([]); //init empty object, pulling an object



//getProducts List function
const getProducts = async () => {
  const product = await Axios.get(productURL,
    {auth: {
    username: "exercise",
    password: "Cj08f6xnM2ApnGIjbHACnJhcldNPET2q"
}})
setProductList(product.data);
};

useEffect(() => {
  getProducts();


},[]); 

//console.log(products) //this works everytime

//getSales function
const getSales = async () => {
  const sale = await Axios.get(salesURL,
    {auth: {
      username: "exercise",
      password: "Cj08f6xnM2ApnGIjbHACnJhcldNPET2q"
    }})
    setSalesData(sale.data);


};

useEffect(() => {
  getSales(); //will set sales







}, []);



//Adds "name" prop into Sales DATA
sales.data.forEach(obj => {
  const elementInArr2 = products.data.find((o) => o.product_id === obj.product_id );
  
  //if(elementInArr2) obj.name = products.
  //console.log(elementInArr2.product_id + " response here")
  
    //this works 
    for(let i = 0; i < products.data.length; i ++){
      if(obj.product_id === products.data[i].product_id){
        //console.log(true)
        obj.name = products.data[i].name
      }
    }
  

});


//Modify Sales Date Prop for easy graphing
sales.data.forEach(obj => {
  obj.order_date = obj.order_date.substr(0,10);
})

sales.data.sort(function compare(a, b) {
  var dateA = new Date(a.order_date);
  var dateB = new Date(b.order_date);
  return dateA - dateB;
});

let dates = []

for(let x = 0; x < sales.data.length; x++){
  let temp = sales.data[x].order_date;
  dates.push(temp)

} 

console.log(dates)

//Attempting to make new array of objects for graphing
//Finding unique dates so I can create new key:value pairs when graphing for each day
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

let unique_dates = dates.filter(onlyUnique)
console.log(unique_dates)


console.log(unique_dates)
let costperDay = [];

for(let i = 0; i < unique_dates.length; i++){
let total = 0;
  sales.data.forEach(obj => {
  if(unique_dates[i] === obj.order_date){
    total += obj.total_price_usd;
  }
}
)
costperDay.push(total)
total = 0;
}

console.log(costperDay)

const total_sales = [];

var data = []; 

 var test =[];



  for(var i = 0; i < unique_dates.length; i++) {

      test["order_date"] = unique_dates[i]
      test["sale_day"] = costperDay[i]

      data.push(test)
      return data
      
  }


console.log(data)



console.log("still working?")

//Need to figure out how to link data for per day sales and date





return (
  <div>
        <ResponsiveContainer width="100%" aspect ={1.5}> 
        <BarChart
          width={1000}
          height={1200}
          data={sales.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom:130,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="order_date" textAnchor= "end" sclaeToFit="true" verticalAnchor= "start" interval={0} angle= "-40" stroke="#8884d8" fontSize={15}  />
          <YAxis dataKey="total_price_usd"/>
          <Tooltip />
      
          <Bar dataKey="total_price_usd"  fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
  </div>
  );
}


export default ProductBarChart


