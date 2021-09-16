"use strict";
require('dotenv').config();
const express = require("express");
const server = express();
const weatherData = require("./data/weather.json");
const PORT =process.env.PORT;

// http://localhost:3014/weather
server.get("/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  console.log(`req: lat=${lat}, lon=${lon}`);

  let theWeather = weatherData.find((item) => {
    if (item.lat === lat && item.lon === lon) {
      return true;
    }
  });

  if (theWeather) {
    let resultArr = [];
    theWeather.data.forEach((item) => {
      resultArr.push({
        description: `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`,
        date: `${item.datetime}`,
      });
      console.log(resultArr);
    });
    
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(resultArr);
  }
});

server.get("*", (req, res) => {
  res.status(500).send("Somthing Went Wrong");
});

server.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});



// 'use strict';


// require('dotenv').config(); //to import dotenv

// const axios = require('axios');

// const express = require('express'); //import express

// const cors = require('cors'); //import cors

// // const pockData = require('./assets/data.json');
// const weatherdata = require('./data/weather.json');

// const server = express();

// server.use(cors());

// const PORT = process.env.PORT;



// // http://localhost:3014/weather?cityName=Amman
// server.get('/weather', (req, res) => {
//     // res.send('Hello from the home route')

//     const cityname = req.query.cityname;


//     let weatherArr =[]
//     let resultObj = weatherdata.find((item) => {

//         if (item.city_name === cityname) {

//              weatherArr = item.data.map(day =>{
//             const dayobj =new Forcast(day);
//             return  dayobj;

//             })
//         }
//        })
//     //    console.log(weatherArr);


//     res.send(weatherArr);
//     });

//     // console.log(resultObj);})

// // declear constractar

// function Forcast(day){
// this.valid_date = day.valid_date,
// this.desc=`Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}` 
// }

//     // http://localhost:3014/test
//     server.get('/test', (req, res) => {
//         res.send('Hi from test route');
//     })

//     // http:localhost:3014/***** */
//     server.get('*', (req, res) => {
//         res.status(404).send('Sorry, page not found');
//     })


//     server.listen(PORT, () => {
//         console.log(`Hello, I am listening on ${PORT}`);
//     })