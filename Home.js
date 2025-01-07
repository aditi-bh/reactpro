import React, { useState } from "react";
import axios from "axios";
import './Home.css';
<meta name="viewport" content="width=device-width, initial-scale=1.0" />


// {loading && <p className="loading-message">Loading...</p>} /* Show loading message */
// {error && <p className="error-message">{error}</p>} {/* Show error message */}

function Home() {
    // State to hold weather data and input value
    const [data, setData] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error messages

    // Function to fetch weather data based on user input
    const fetchWeatherData = async (location) => {
        setLoading(true); // Set loading to true when fetching data
        setError(null); // Reset error state
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=3f0b4a0460624a78b0d105400241012&q=${location}&aqi=no`);
            setData(response.data);
        } catch (error) {
            setError("Error fetching weather data. Please try again."); // Set error message
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    // Handle search button click
    const handleSearch = (e) => {
        e.preventDefault();
        if (inputValue) {
            fetchWeatherData(inputValue);
        }
    };

    // Render component
    return (
        
        <div className="Div">
            <h1 className="head">The Weather App</h1>
            <input 
                type="text" 
                placeholder="Name of the place" 
                className="target-field" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
            />
            <button className="search-field" onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>} {/* Show loading message */}
            {error && <p>{error}</p>} {/* Show error message */}
            {data && !loading && (
                <div className="weather-data">
                    <h3>Weather in {data.location.name}</h3>
                    <p className="temp">Temperature: {data ? data.current.temp_c : 'Loading...'}  °C </p>
                    <p className="cond">Condition: {data ? data.current.condition.text : 'Loading...'}</p>
                </div>
            )}
        </div>
    );
}

export default Home;