import axios from "axios";
import React, { useRef, useState } from "react";
import { FaThermometerHalf, FaTint, FaWind, FaEye } from "react-icons/fa";

const Weather = () => {
  let inputRef = useRef(null);
  let [weatherData, setweatherData] = useState(null); 

  let getCityName = async () => {
    let cityName = inputRef.current.value;
    console.log("City Name:", cityName);

    try {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4836e314d017e8585055fbad099cb68e&units=metric`
      );
      console.log("API Response:", res.data);

      setweatherData(res.data);
      inputRef.current.value = "";

    } catch (error) {
      console.log("Error:", error);
    }
   
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/weather.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-6">
        {/* Search Bar Section */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter City Name"
            ref={inputRef}
            className="w-full p-3 rounded-lg text-xl mb-4 border border-gray-300"
          />
          <button
            onClick={getCityName}
            className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          >
            Search Weather
          </button>
        </div>

        {/* Weather Data Section */}
        {weatherData ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {weatherData.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {weatherData?.weather[0]?.description}
                </p>
              </div>
            </div>

            <div className="mb-6 text-center">
              <p className="text-7xl font-bold text-gray-800">
                {weatherData?.main?.temp}°C
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center bg-blue-100 rounded-lg p-3">
                <FaThermometerHalf className="w-6 h-6 mr-3 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Feels like</p>
                  <p className="font-semibold">{weatherData?.main?.feels_like}°C</p>
                </div>
              </div>
              <div className="flex items-center bg-green-100 rounded-lg p-3">
                <FaTint className="w-6 h-6 mr-3 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-semibold">{weatherData?.main?.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center bg-yellow-100 rounded-lg p-3">
                <FaWind className="w-6 h-6 mr-3 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Wind Speed</p>
                  <p className="font-semibold">{weatherData?.wind?.speed} m/s</p>
                </div>
              </div>
              <div className="flex items-center bg-purple-100 rounded-lg p-3">
                <FaEye className="w-6 h-6 mr-3 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Visibility</p>
                  <p className="font-semibold">{weatherData?.visibility / 1000} km</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Enter a city to see the weather</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
