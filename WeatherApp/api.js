import { WeatherData, City } from './functions';

export const cities = [
  new City('Oulu', 'Finland', 'https://en.wikipedia.org/wiki/Oulu'),
  new City('Helsinki', 'Finland', 'https://en.wikipedia.org/wiki/Helsinki'),
  new City('Gothenburg', 'Sweden', 'https://en.wikipedia.org/wiki/Gothenburg'),
  new City('London', 'United Kingdom', 'https://en.wikipedia.org/wiki/London'),
  new City('Vienna', 'Austria', 'https://en.wikipedia.org/wiki/Vienna'),
  new City('Madrid', 'Spain', 'https://en.wikipedia.org/wiki/Madrid'),
  new City('Istanbul', 'Turkey', 'https://en.wikipedia.org/wiki/Istanbul'),
  new City('Moscow', 'Russia', 'https://en.wikipedia.org/wiki/Moscow'),
  new City('New York', 'United States', 'https://en.wikipedia.org/wiki/New_York_City'),
  new City('San Francisco', 'United States', 'https://en.wikipedia.org/wiki/San_Francisco'),
  new City('Tokyo', 'Japan', 'https://en.wikipedia.org/wiki/Tokyo'),
  new City('Sydney', 'Australia', 'https://en.wikipedia.org/wiki/Sydney'),
  new City('Mexico City', 'Mexico', 'https://en.wikipedia.org/wiki/Mexico_City'),
  new City('Rio de Janeiro', 'Brazil', 'https://en.wikipedia.org/wiki/Rio_de_Janeiro'),
  new City('Nairobi', 'Kenya', 'https://en.wikipedia.org/wiki/Nairobi'),
  new City('Cape Town', 'South Africa', 'https://en.wikipedia.org/wiki/Cape_Town'),
  new City('Kuwait City', 'Kuwait', 'https://en.wikipedia.org/wiki/Kuwait_City'),
  new City('Timbuktu', 'Mali', 'https://en.wikipedia.org/wiki/Timbuktu'),
  new City('Chongqing', 'China', 'https://en.wikipedia.org/wiki/Chongqing'),
  new City('Bangkok', 'Thailand', 'https://en.wikipedia.org/wiki/Bangkok'),
  new City('Delhi', 'India', 'https://en.wikipedia.org/wiki/Delhi'),
  new City('Jakarta', 'Indonesia', 'https://en.wikipedia.org/wiki/Jakarta'),
  new City('Alice Springs', 'Australia', 'https://en.wikipedia.org/wiki/Alice_Springs'),
  new City('Reykjavik', 'Iceland', 'https://en.wikipedia.org/wiki/Reykjavik'),
  new City('Tromsø', 'Norway', 'https://en.wikipedia.org/wiki/Tromsø'),
  new City('Nuuk', 'Greenland', 'https://en.wikipedia.org/wiki/Nuuk'),
  new City('Yakutsk', 'Russia', 'https://en.wikipedia.org/wiki/Yakutsk'),
  new City('Noril\'sk', 'Russia', 'https://en.wikipedia.org/wiki/Norilsk'),
  new City('Anchorage', 'United States', 'https://en.wikipedia.org/wiki/Anchorage'),
  new City('Ushuaia', 'Argentina', 'https://en.wikipedia.org/wiki/Ushuaia')
];

const API_KEY = 'API_KEY_HERE';

export async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return new WeatherData(city.name, data.main.temp, data.weather[0].description, data.timezone);
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
}
