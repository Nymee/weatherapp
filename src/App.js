import {useState } from "react";

function App() {

  const api = {
    key:"e53b5d79c679cb4d60b80bd0d4928e36",
    base: "https://api.openweathermap.org/data/2.5/"
  }


  const dateBuilder=function(d){
    let days=["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    let day=days[d.getDay()];
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    let date=d.getDate();
    return[day," ",date," ",month," ",year];
  }

  const [weather, setWeather]= useState({});
  const[query,setQuery]= useState('');


  const handleChange = (event) => {
    setQuery(event.target.value);
}

const search = (event) => {
  if(event.key==='Enter'){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)  //here weather is the endpoint. endpoints are defined in api. it could be weather/clouds et
      .then(res=>res.json())
      .then(function(result){
          setWeather(result);
          setQuery('');
          console.log(result);
  })
        setQuery('')
  }
}

  return (
    <div className="container">
      <div className={weather.main && weather.main.temp>16?'app warm':'app'}>
        <div className="search-box">
          <div className="container-1">
             <input type= "text" 
                    className= "search-bar"
                    placeholder="Search.. "
                    onChange= {handleChange}
                    value={query}
                    onKeyDown={search}>

              </input>
          </div>
        {weather.main&&(
         <div className="weather-data">
          <div className="location">
            <h1>{weather.name}</h1>
          </div>
          <div className="date">
            <h2>{dateBuilder(new Date())}</h2>
          </div>
          <div className="temp">
            <h2>{`${Math.round(weather.main.temp)}°C`}</h2>
          </div>
          <div className="weather">
            <h2>{weather.weather[0].main}</h2>
          </div>
        </div>  
        )}
        </div>
      </div>
    </div>
    
  );
}

export default App;
