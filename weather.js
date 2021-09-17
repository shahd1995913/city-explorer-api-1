const axios = require("axios");


function weatherFunction (req,res)
{

const name = req.query.name;

let weatherURL =`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${process.env.WEATHER_API_KEY}`;

axios
.get(weatherURL)
.then(newArray => {
    let x = newArray.data.data.map((element)=>{
        return new WeatherClass(element)
    })
    res.send(x)
} )
.catch(e =>{console.log('Error in handling the weather')})

  
}

class WeatherClass
{

constructor(i){
this.date = i.valid_date
this.description =`The Low  Temp of ${ i.low_temp}, and The high  Temp of ${ i.high_temp} with  ${ i.weather.description}`


}


}



module.exports =  weatherFunction