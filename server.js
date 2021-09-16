"use strict";

require("dotenv").config();

const express = require("express");

const server = express();

const PORT = process.env.PORT;

const axios = require("axios");

const Cors = require("cors");

server.use(Cors());

// http://localhost:3014/weather?cityName=Amman&lat=31.9515694&lon=35.9239625

server.get("/weather", async (req, res) => {

  const cityName = req.query.cityName;
  const lat = req.query.lat;
  const lon = req.query.lon;
  const key = process.env.WEATHER_API_KEY;
  let finalResult = [];
  try {
    let result = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`
    );
    finalResult = result.data.data.map((item) => {
      return new Forecast(item);
    });
    res.status(200).send(finalResult);
  } catch (e) {
    console.log(`"weather" error: ${e}`);
  }
});

function Forecast(el) {
  this.description = `Low of ${el.low_temp}, high of ${el.high_temp} with ${el.weather.description}`;
  this.date = `${el.valid_date}`;
}

// http://localhost:3014/movies?query=Amman
server.get("/movies", async (req, res) => {
  const key = process.env.MOVIES_API_KEY;
  const movieName = req.query.query;
  let moviesArr = [];
  let moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieName}`;
  console.log(moviesURL);
  try {
    let movieResult = await axios.get(moviesURL);
    moviesArr = movieResult.data.results.map((item) => {
      return new Movies(item);
    });
    if(moviesArr.length >20)
      moviesArr = moviesArr.slice(0,20);
    res.status(200).send(moviesArr);
  } catch (e) {
    console.log(`"movies" error: ${e}`);
  }
});

function Movies(elemnt) {
  this.title = elemnt.title;
  this.overview = elemnt.overview;
  this.avaregVotes = elemnt.vote_average;
  this.totalVotes = elemnt.vote_count;
  this.imageUrl = `https://image.tmdb.org/t/p/w500${elemnt.poster_path}`;
  this.popularity = elemnt.popularity;
  this.released_on = elemnt.release_date;
}
server.get("*", (req, res) => {
  res.status(500).send("Somthing Went Wrong");
});
server.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});

// // 'use strict';


// // require('dotenv').config(); //to import dotenv

// // const axios = require('axios');

// // const express = require('express'); //import express

// // const cors = require('cors'); //import cors

// // // const pockData = require('./assets/data.json');
// // const weatherdata = require('./data/weather.json');

// // const server = express();

// // server.use(cors());

// // const PORT = process.env.PORT;



// // // http://localhost:3014/weather?cityName=Amman
// // server.get('/weather', (req, res) => {
// //     // res.send('Hello from the home route')

// //     const cityname = req.query.cityname;


// //     let weatherArr =[]
// //     let resultObj = weatherdata.find((item) => {

// //         if (item.city_name === cityname) {

// //              weatherArr = item.data.map(day =>{
// //             const dayobj =new Forcast(day);
// //             return  dayobj;

// //             })
// //         }
// //        })
// //     //    console.log(weatherArr);


// //     res.send(weatherArr);
// //     });

// //     // console.log(resultObj);})

// // // declear constractar

// // function Forcast(day){
// // this.valid_date = day.valid_date,
// // this.desc=`Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}` 
// // }

// //     // http://localhost:3014/test
// //     server.get('/test', (req, res) => {
// //         res.send('Hi from test route');
// //     })

// //     // http:localhost:3014/***** */
// //     server.get('*', (req, res) => {
// //         res.status(404).send('Sorry, page not found');
// //     })


// //     server.listen(PORT, () => {
// //         console.log(`Hello, I am listening on ${PORT}`);
// //     })