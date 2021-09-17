"use strict";

//to run : node filename.js
//visit localhost:3000
// assuming you have done 1) npm init 2) npm install express


require("dotenv").config();

const express = require("express");

const server = express();

const PORT = process.env.PORT;

const cors = require("cors");
server.use(cors())



const movieFunction = require("./movies");


const weatherFunction = require("./weather");


server.get('/movies',movieFunction)

server.get('/weather',weatherFunction)


server.listen(PORT, () => console.log(`Example app listening at weather`))








// // http://localhost:3300/weather?cityName=Amman&lat=31.9515694&lon=35.9239625
// server.get("/weather", Weather);

// // http://localhost:3300/movies?query=Amman
// server.get("/movies", Movie);

// server.get("*", (req, res) => {
//   res.status(500).send("Somthing Went Wrong");
// });
// server.listen(PORT, () => {
//   console.log(`I am listening on ${PORT}`);
// });



// let weatherFunction = async function (req, res) {
//   const lat = req.query.lat;
//   const lon = req.query.lon;
//   const key = process.env.WEATHER_API_KEY;
//   let finalResult = [];

//   let result = await axios.get(
//     `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`
//   );
//   finalResult = result.data.data.map((item) => {
//     return new Forecast(item);
//   });
//   res.status(200).send(finalResult);
// };

// function Forecast(el) {
//   this.description = `Low of ${el.low_temp}, high of ${el.high_temp} with ${el.weather.description}`;
//   this.date = `${el.valid_date}`;
// }

// module.exports = weatherFunction;