const API_KEY = "b3df8c2191731ce389a9f1762d2fd91a";

export const getWeatherByCity = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    if(data.name) {
        return {
            city: data.name,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };  
    } else return null
    // console.log(data);
};

export const getWeatherByCoords = async(lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    if(data.name) {
        return {
            city: data.name,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };  
    } else return null
}