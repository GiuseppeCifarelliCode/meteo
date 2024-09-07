import {useState, useEffect} from 'react';
import WeatherCard from '../components/WeatherCard';
import { getWeatherByCity } from '../services/weatherService';

function Favorites({favorites}){
    const [weatherData, setWeatherData] = useState([])

    useEffect(() => {
        const fetchWeatherForFavorites = async() => {
            try {
                const weatherPromises = favorites.map(city => getWeatherByCity(city))
                const weatherResults = await Promise.all(weatherPromises)
                setWeatherData(weatherResults)
            } catch (error) {
                console.error('Errore nel caricamento dei dati meteo:', error)
            }
        }

        if(favorites.length > 0) {
            fetchWeatherForFavorites()
        }
    },[favorites])

    return (
        <div>
            <h2>Favorites</h2>
            {weatherData.length === 0 ? (
                <p>No favorites yet.</p>
            ): (
            <div className='container-favorites'>
                {weatherData.map((city, index) => (
                    <WeatherCard key={index} weatherData={city} isAuthenticated={true} />
                ))}
            </div>
            )}
        </div>
    )
}

export default Favorites;