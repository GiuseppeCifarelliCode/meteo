import WeatherCard from "../components/WeatherCard";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherService";
import { useState, useEffect} from 'react';

function Home({onAddToFavorites, isAuthenticated}){
    const [weatherData, setWeatherData] = useState(null)
    const [city, setCity] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async(position) => {
            const {latitude, longitude} = position.coords
            const data = await getWeatherByCoords(latitude, longitude)
            setWeatherData(data)
        })
    },[])

    async function handleSearch(e) {
        e.preventDefault()
        setError(null)
        if(city) {
            const data = await getWeatherByCity(city)
            setWeatherData(data)
        } else {
            setError('Inserisci una città!');
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch} className="search-form">
                <input placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)}></input>
                <button type="submit">Search</button>
            </form>

            {error && (
                <p className="error">{error}</p>
            )}
            {weatherData && (
                <WeatherCard weatherData={weatherData} isAuthenticated={isAuthenticated} onAddToFavorites={() => onAddToFavorites(weatherData.city)}></WeatherCard>
            )}
        </div>
    )
}

export default Home;