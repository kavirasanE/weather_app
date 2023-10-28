import React, { useState } from 'react'
import './Weather.css'
import search_icon from "../Assest/search.png";
import cloud_icon from "../Assest/cloud.png";
import humidity_icon from "../Assest/humidity.png";
import wind_icon from "../Assest/wind.png";
import clear_icon from "../Assest/clear.png";
import drizzle_icon from "../Assest/drizzle.png";
import rain_icon from "../Assest/rain.png";
import snow_icon from "../Assest/snow.png";


const Weather = () => {
    let api_key = 'eeeac2ffebdc616faabbd57f82770ceb';
    // wicon is a variable where we initialize with cloud icon amd setWicon is a function to update the data in wicon 
    const [wicon,setWicon] = useState(cloud_icon);
    //before fetching the APi we have to convert the funcction to sync function
    
    const search = async () => {
        const element = document.getElementsByClassName("cityInput"); // Fix the class name to match the input element
        if (element.length > 0 && element[0].value.trim() === "") {
          return 0;
        }
         // ${} literals where hard coded we are making soft coded using the backstick`
         let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
         //(await) it will wait until the data and response is converted into the repective form
         let response =await fetch (url);
         let data = await response.json();
         const humidity =document.getElementsByClassName("humidity-percent");
         const wind =document.getElementsByClassName("wind-rate");
         const temperature =document.getElementsByClassName("weather-temp");
         const location =document.getElementsByClassName("weather-location");

         humidity[0].innerHTML = data.main.humidity + "%";
         wind[0].innerHTML = Math.floor(data.wind.speed)+ " km/hr";
         temperature[0].innerHTML =Math.floor(data.main.temp) + "°c";
         location[0].innerHTML = data.name;
           //weather in thunderclient
         if(data.weather[0].icon==="01d"||data.weather[0].icon==="01n"){
            setWicon(clear_icon);
         }
         else if (data.weather[0].icon==="02d"||data.weather[0].icon==="02n"){
            setWicon(cloud_icon);
         }
         else if (data.weather[0].icon==="03d"||data.weather[0].icon==="03n"){
            setWicon(drizzle_icon);
         }
         else if (data.weather[0].icon==="04d"||data.weather[0].icon==="04n"){
            setWicon(drizzle_icon);
         }
         else if (data.weather[0].icon==="09d"||data.weather[0].icon==="09n"){
            setWicon(rain_icon);
         }
         else if (data.weather[0].icon==="10d"||data.weather[0].icon==="10n"){
            setWicon(rain_icon);
         }
         else if (data.weather[0].icon==="13d"||data.weather[0].icon==="13n"){
            setWicon(snow_icon);
         }
         else {
            setWicon(clear_icon);
         }
    }
  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='Search'/>
            <div className='search-icon' onClick={()=> {search()}}>
              <img src={search_icon} alt="" />
            </div>
        </div>
      <div className='weather-image'>
           <img src={wicon} alt=" " />
           </div>
           <div className='weather-temp'>24°c</div>
           <div className='weather-location'>London</div>
           <div className='data-container'>
            <div className='element'>
             <img src={humidity_icon} alt=" " className='icon' /> 
               <div className='data'>
                <div className="humidity-percent">
                    64%
                </div>
                <div className="text">Humidity</div>
               </div>
            </div>
            <div className='element'>
                <img src={wind_icon} alt='' className='icon' /> 
               <div className='data'>
                <div className="wind-rate">
                    18 km/h
                </div>
                <div className="text">Wind-speed</div>
               </div>
            </div>
           </div>
    </div>
  )
}

export default Weather