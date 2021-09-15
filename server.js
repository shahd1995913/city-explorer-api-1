'use strict';


require('dotenv').config(); //to import dotenv
const express = require('express'); //import express
const cors = require('cors'); //import cors
// const pockData = require('./assets/data.json');
const weatherData = require('./data/weather.json');
const server = express();
server.use(cors());

const PORT =3011;


// http://localhost:3011/getData
server.get('/getData',(req,res)=>{
   
    let DataWeathear = weatherData.data.map( (item) => {
        return item.city_name;
    })

    res.status(200).send(DataWeathear);
})



// http://localhost:3011/
server.get('/',(req,res)=>{
    res.send('Hello from the home route')
})



// http://localhost:3011/test
server.get('/test',(req,res) => {
    res.send('Hi from test route');
})

// http:localhost:3011/***** */
server.get('*',(req,res)=>{
    res.status(404).send('Sorry, page not found');
})


server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})