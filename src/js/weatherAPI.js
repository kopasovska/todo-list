import axios from 'axios';

const WEATHER_API_KEY = 'aece857dab4839405411e9fc4ad000b3';

const fetchCountryAndCity = async () => {
  const response = await axios.get('http://ip-api.com/json/');
  return {
    country: response.data.countryCode,
    city: response.data.city,
  };
};

const fetchWeather = async (countryCode, city) => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast/',
      {
        params: {
          q: `${city},${countryCode}`,
          appid: WEATHER_API_KEY,
          units: 'metric',
          lang: 'en',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getForecast = async () => {
  const location = await fetchCountryAndCity();
  console.log('Location: ', location);

  const forecast = await fetchWeather(location.countryCode, location.city);
  console.log('Forecast: ', forecast);
};

export default getForecast;
