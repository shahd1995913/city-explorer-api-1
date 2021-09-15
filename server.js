'use strict';


require('dotenv').config(); //to import dotenv

const axios = require('axios');

const express = require('express'); //import express

const cors = require('cors'); //import cors

// const pockData = require('./assets/data.json');
const weatherData = require('./data/weather.json');

const server = express();

server.use(cors());

const PORT =process.env.PORT;

// const getWeather = require('./weather')

// server.get('/daily', getWeather);





// http://localhost:3014/
// http://localhost:3014/weather?searchQuery=Amman
server.get('/weather',(req,res)=>{
    // res.send('Hello from the home route')
  
const lat = req.query.latitude;
   const lon = req.query.longitudinal;
   let weatherArray=[];
    const result = weatherData.find(item =>{
        if(item.lat === lat && item.lon === lon)
        {
        
         weatherArray=item.data.map(day => {
                return new Forcast(day)
            })
        }       
    })
    
    res.send(weatherArray);
});

function Forcast(day){
    this.date=day.valid_date
    this.description=`Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`
}




// http://localhost:3014/test
server.get('/test',(req,res) => {
    res.send('Hi from test route');
})

// http:localhost:3014/***** */
server.get('*',(req,res)=>{
    res.status(404).send('Sorry, page not found');
})


server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})