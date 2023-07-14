import React, { useState, useEffect } from 'react';
const API_KEY = '6368168625a9116481d42369235bc9f0';

function WeatherApp() {
  const [cities, setCities] = useState([]);

  const handleAddCity = (city) => {
    setCities([...cities, city]);
  };

  const handleRemoveCity = (city) => {
    setCities(cities.filter((c) => c !== city));
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 flex justify-center text-white">Weather App</h1>
      <AddCityForm onAddCity={handleAddCity} />
      <ul className="mt-4 text-blue-500 font-bold text-3xl flex justify-center">
        {cities.map((city) => (
          <CityWeather className="flex" key={city} city={city} onRemoveCity={handleRemoveCity} />
        ))}
      </ul>
    </div>
  );
}

function AddCityForm({ onAddCity }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCity(city);
    setCity('');
  };

  return (
    <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border rounded px-2 py-1 "
      />
      <button type="submit" className="bg-blue-500 text-white px-2 py-1.5 rounded focus:bg-purple-500 ">
        Add City
      </button>
    </form>
    </div>
  
  );
}

function CityWeather({ city, onRemoveCity }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }, [city]);

  return (
    <li className="flex justify-center items-center mb-2 bg-gray-300 p-[3rem] backdrop-opacity-0 mr-[10px]">
      <div className='flex'>
        <div>
        <div>{city}</div>
        {weather && (
          <div>
            {Math.round(weather.main.temp - 273.15)}°C, {weather.weather[0].main}
          </div>
        )}
        </div>
        <button
        className="bg-red-500 text-white px-[1rem] py-[1rem] rounded ml-[2rem]"
        onClick={() => onRemoveCity(city)}>
        x
      </button>
      </div>
    </li>
  );
}

export default WeatherApp;