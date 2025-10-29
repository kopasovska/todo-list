import axios from 'axios';
import { fetchWeatherApi } from 'openmeteo';

function getCurrentTime() {
  const now = new Date();
  const weekday = now.toLocaleDateString(`en-GB`, {
    weekday: 'long',
  });
  const time = now.toLocaleTimeString(`en-GB`, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${weekday}, ${time}`;
}

function formatDaylight(daylightArray) {
  return Array.from(daylightArray).map(seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  });
}

function getWeatherDesc(code) {
  if (code === 0) return 'Clear';
  if ([1, 2, 3].includes(code)) return 'Cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if (code >= 51 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 95 && code <= 99) return 'Thunderstorms';
  return 'Unknown';
}

const fetchCoordinates = async () => {
  const response = await axios.get('http://ip-api.com/json/');
  return {
    lat: response.data.lat,
    lon: response.data.lon,
    city: response.data.city,
    country: response.data.country,
  };
};

const fetchWeather = async ({ lat, lon, city, country }) => {
  const params = {
    latitude: lat,
    longitude: lon,
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'daylight_duration',
      'sunset',
    ],
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'rain',
      'snowfall',
      'weather_code',
      'wind_speed_10m',
      'precipitation',
      'is_day',
    ],
  };
  const url = 'https://api.open-meteo.com/v1/forecast';

  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current();
  const daily = response.daily();

  const sunrise = daily.variables(3);
  const sunset = daily.variables(5);

  console.log(current.time());
  console.log(utcOffsetSeconds);

  const dailyCodes = [...daily.variables(0).valuesArray()];
  const dailyWeatherDesc = dailyCodes.map(code => getWeatherDesc(code));
  const dailyTempMax = [...daily.variables(1).valuesArray()];
  const dailyTempMin = [...daily.variables(2).valuesArray()];

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString('en-ES', { weekday: 'short' });
  });

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    city,
    country,
    current: {
      time: getCurrentTime(),
      temperature_2m: Math.round(current.variables(0).value()),
      relative_humidity_2m: current.variables(1).value(),
      rain: current.variables(2).value(),
      snowfall: current.variables(3).value(),
      weather_code: getWeatherDesc(current.variables(4).value()),
      wind_speed_10m: Math.round(current.variables(5).value()),
      precipitation: current.variables(6).value(),
      is_day: current.variables(7).value(),
    },
    daily: {
      time: days,
      weather_code: dailyWeatherDesc,
      temperature_2m_max: dailyTempMax.map(temp => Math.round(temp)),
      temperature_2m_min: dailyTempMin.map(temp => Math.round(temp)),
      // Map Int64 values to according structure
      sunrise: [...Array(sunrise.valuesInt64Length())].map((_, i) => {
        const date = new Date(
          (Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000
        );
        const formatted = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return formatted.toLowerCase();
      }),
      daylight_duration: formatDaylight(daily.variables(4).valuesArray()),
      // Map Int64 values to according structure
      sunset: [...Array(sunset.valuesInt64Length())].map((_, i) => {
        const date = new Date(
          (Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000
        );
        const formatted = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return formatted.toLowerCase();
      }),
    },
  };

  return weatherData;
};

const getForecast = async () => {
  try {
    const location = await fetchCoordinates();
    const forecast = await fetchWeather(location);
    return forecast;
  } catch (error) {
    console.log(error);
  }
};

export default getForecast;
