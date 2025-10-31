import { refs } from './refs.js';
import img from '../img/sprite.svg'

const getIconByWeatherCode = (code, isDay) => {
  if (code === 'Clear' && isDay) return `${img}#icon-sun`;
  if (code === 'Clear' && !isDay) return `${img}#icon-moon`;
  if (code === 'Cloudy' && isDay) return `${img}#icon-partly-cloudy`;
  if (code === 'Cloudy' && !isDay)
    return `${img}#icon-partly-cloudy-night`;
  if (code === 'Fog') return `${img}#icon-cloudy`;
  if (code === 'Rain') return `${img}#icon-rainy`;
  if (code === 'Snow') return `${img}#icon-snowy`;
  if (code === 'Thunderstorms') return `${img}#icon-thunder`;
  if (code === 'Unknown') return `${img}#icon-unknown`;
};

const getWeatherWidgetMarkup = forecast => {
  if (!forecast) {
    return `<p>Oooops...</p>
  <p>Something went wrong :( </p>
  <p>Try again later!</p>`;
  }

  const iconPath = getIconByWeatherCode(
    forecast.current.weather_code,
    forecast.current.is_day
  );

  return `<div class="today-weather-wrapper glass-effect">
    <div class="today-weather-info">
      <svg class="today-weather-icon" width="80" height="80" aria-hidden="true">
        <use href=${iconPath}></use>
      </svg>
      <span class="today-weather-data-wrapper">
        <p class="weather-text today-date">${forecast.current.time}</p>
        <p class="weather-text today-weather bold-text">${
          forecast.current.weather_code
        }, ${forecast.current.temperature_2m}&deg;</p>
        <p class="weather-text today-location">${forecast.city}, ${
    forecast.country
  }</p>
      </span>
    </div>
    <div class="sun-info-wrapper">
      <span class="sun-wrapper">
        <svg class="sun-icon" width="24" height="24" aria-hidden="true">
          <use href="${img}#icon-sunrise"></use>
        </svg>
        <p class="weather-bright-text">${forecast.daily.sunrise[0]}</p>
      </span>
      <p class="weather-bright-text">${forecast.daily.daylight_duration[0]}</p>
      <span class="sun-wrapper">
        <p class="weather-bright-text">${forecast.daily.sunset[0]}</p>
        <svg class="sun-icon" width="24" height="24" aria-hidden="true">
          <use href="${img}#icon-sunset"></use>
        </svg>
      </span>
    </div>
  </div>
  <div class="rain-info-wrapper glass-effect">
    <svg class="rainy-icon" width="24" height="24" aria-hidden="true">
      <use href="${img}#icon-rainy"></use>
    </svg>
    <p class="weather-text">Rain: <span class="bold-text">${
      forecast.current.precipitation
    }%</span></p>
  </div>
  <div class="additional-info-wrapper">
    <p class="weather-text">Humidity: <span class="bold-text">${
      forecast.current.relative_humidity_2m
    }%</span></p>
    <p class="weather-text">Wind: <span class="bold-text">${
      forecast.current.wind_speed_10m
    } m/s</span></p>
  </div>
  <ul class="forecast-list">
  ${forecast.daily.time
    .map((day, i) => {
      return `<li class="forecast-item glass-effect">
      <p class="weather-text day-of-week-text">${i === 0 ? 'Today' : day}</p>
      <svg class="rainy-icon" width="24" height="24" aria-hidden="true">
        <use href="${getIconByWeatherCode(
          forecast.daily.weather_code[i]
        )}"></use>
      </svg>
      <p class="weather-text">${forecast.daily.temperature_2m_max[i]}&deg;</p>
      <p class="weather-text">${forecast.daily.temperature_2m_min[i]}&deg;</p>
    </li>`;
    })
    .join('')}
  </ul>`;
};

const renderWeatherWidget = forecast => {
  refs.weatherWidget.innerHTML = '';
  refs.weatherWidget.innerHTML = getWeatherWidgetMarkup(forecast);
};

export default renderWeatherWidget;
