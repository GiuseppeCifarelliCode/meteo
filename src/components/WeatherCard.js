function WeatherCard({isAuthenticated ,weatherData, onAddToFavorites}) {
    return (
        <div className="weather-card">
            <img src={weatherData.icon} alt={weatherData.description}></img>
            <h2>{weatherData.city}</h2>
            <p>Temperature: {weatherData.temp}°C</p>
            <p>Condition: {weatherData.description}</p>
            {isAuthenticated ? <button onClick={onAddToFavorites}>Add To Favorites</button> : null}
        </div>
    )
}

export default WeatherCard;