import React, { useEffect, useRef, useState } from "react";

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const search = async (city) => {
    if (city === "") {
      alert("Enter the City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5176b4dfbc66390062d83eaae09c9831`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      console.log(data);

      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      
      inputRef.current.value = '';
    } catch (error) {
      alert(error.message); 
      console.error(error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="bg-gradient-to-b from-blue-500 to-indigo-600 w-[360px] h-[540px] rounded-3xl shadow-xl p-6">
        <div className="flex justify-center items-center mb-6">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="rounded-full py-2 px-4 text-lg w-full shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            className="bg-white p-2 rounded-full shadow ml-2"
            onClick={() => search(inputRef.current.value)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11 2a9 9 0 1 0 5.618 16.032l3.675 3.675a1 1 0 0 0 1.414-1.414l-3.675-3.675A9 9 0 0 0 11 2m-6 9a6 6 0 1 1 12 0a6 6 0 0 1-12 0" />
            </svg>
          </button>
        </div>

        {weatherData && (
          <div className="flex flex-col items-center text-white mb-8">
            <img src={weatherData.icon} alt="weather-icon" className="w-[120px] mb-4" />
            <h1 className="text-6xl font-bold mb-1">{weatherData.temperature}°C</h1>
            <p className="text-3xl font-medium">{weatherData.location}</p>
          </div>
        )}

        {weatherData && (
          <div className="bg-white/30 backdrop-blur-md p-4 rounded-lg flex justify-around text-white text-lg shadow-inner">
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full p-3 mb-2 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="black" d="M2 18v-2q.95 0 1.413-.5T5.35 15t1.938.5t1.362.5q.95 0 1.413-.5T12 15q1.425 0 1.938.5t1.412.5q.95 0 1.388-.5t1.912-.5t1.938.5T22 16v2q-1.425 0-1.937-.5T18.65 17t-1.362.5t-1.938.5q-1.425 0-1.937-.5T12 17q-.95 0-1.412.5T8.65 18t-1.912-.5T5.35 17t-1.412.5T2 18m0-4v-2q.95 0 1.413-.5T5.35 11q1.425 0 1.913.5t1.387.5q.95 0 1.412-.5T12 11q1.425 0 1.925.5t1.375.5q.95 0 1.412-.5t1.938-.5q1.425 0 1.938.5T22 12v2q-1.475 0-1.963-.5T18.65 13t-1.362.5t-1.938.5q-1.425 0-1.937-.5T12 13q-.95 0-1.388.5T8.7 14t-1.962-.5T5.35 13t-1.412.5T2 14m0-4V8q.95 0 1.413-.5T5.35 7q1.425 0 1.913.5T8.65 8q.95 0 1.412-.5T12 7q1.425 0 1.925.5T15.3 8q.95 0 1.412-.5T18.65 7q1.425 0 1.938.5T22 8v2q-1.475 0-1.963-.5T18.65 9t-1.362.5t-1.938.5q-1.425 0-1.937-.5T12 9q-.95 0-1.388.5T8.7 10t-1.962-.5T5.35 9t-1.412.5T2 10" />
                </svg>
              </div>
              <p>{weatherData.humidity}%</p>
              <p>Humidity</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full p-3 mb-2 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                  <path fill="black" d="M24 104a12 12 0 0 1 0-24h96a12 12 0 0 0 0-24a15.07 15.07 0 0 0-10.26 4.45a12 12 0 0 1-17-16.9A39.34 39.34 0 0 1 120 32a36 36 0 0 1 0 72Zm184-36a39.34 39.34 0 0 0-27.3 11.55a12 12 0 0 0 17 16.9A15.07 15.07 0 0 1 208 92a12 12 0 0 1 0 24H32a12 12 0 0 0 0 24h176a36 36 0 0 0 0-72m-56 84H40a12 12 0 0 0 0 24h112a12 12 0 0 1 0 24a15.1 15.1 0 0 1-10.27-4.45a12 12 0 1 0-17 16.9A39.34 39.34 0 0 0 152 224a36 36 0 0 0 0-72" />
                </svg>
              </div>
              <p>{weatherData.windSpeed} m/s</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
