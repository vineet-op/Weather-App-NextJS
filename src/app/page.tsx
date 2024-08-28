"use client";

import { useState } from 'react';
import axios from 'axios';
import Card from "./components/Card";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: Array<{
    main: string;
    icon: string;
  }>;
  main: {
    temp_min: string;
    temp_max: string;
  };
  wind: {
    speed: string;
  };
}


export default function Home() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [data, setData] = useState<WeatherData[]>([]); // Specify the type of data
  const [error, setError] = useState<string | null>(null); // Error state


  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const cityNames = response.data.map((item: any) => `${item.name}, ${item.country}`);
        setSuggestions(cityNames);
      } catch (error) {

        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      setData([response.data]); // Wrap in array to match WeatherData[]
      console.log(response.data);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      setError("Data not found. Please try entering a different city.");
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Weather App</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-lg border text-black border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter city name..."
        />
        {suggestions.length > 0 && (
          <ul className="bg-white border text-black border-gray-300 rounded-lg shadow-lg mt-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer px-4 py-2 hover:bg-blue-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Search
      </button>

      {/* Display alert if there's an error */}
      {error && (
        <Alert className="mt-4 bg-yellow-300" width={"600px"} variant='top-accent '>
          <AlertIcon />
          <AlertTitle className='text-black' >Warning!</AlertTitle>
          <AlertDescription className='text-black'>{error}</AlertDescription>
        </Alert>
      )}


      <div>
        {data.map((d, index) => (
          <Card key={index}
            Name={d.name}
            icon={d.weather[0].icon}
            sys={d.sys.country}
            weather={d.weather[0].main}
            min={d.main.temp_min}
            max={d.main.temp_max}
            wind={d.wind.speed}
          /> // Pass the Name prop here
        ))}
      </div>
    </div>
  );
}
