const axios = require("axios");

let movieList = {}

function movieFunction (req,res)
{

const name = req.query.name;
if(movieList[name] !== undefined)
{
    console.log(movieList[name]);
}
else
{
let movieURL= `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1&include_adult=false`
axios
.get(movieURL)
.then(newArray => {
    let x = newArray.data.results.map((element)=>{
        return new MovieClass(element)
    })
    res.send(x)
} )
.catch(e =>{console.log('Error in handling the movies')})

  
}}

class MovieClass
{

constructor(i){
    this.title = i.title
    this.release_date = i.release_date
    this.overview = i.overview
    this.vote_average = i.vote_average
    this.vote_count = i.vote_count
    this.poster_path=`https://image.tmdb.org/t/p/w500${i.poster_path}`


}


}



module.exports =  movieFunction