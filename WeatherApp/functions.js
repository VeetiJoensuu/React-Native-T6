export class City {
    constructor(name, country, wiki) {
      this.name = name;
      this.country = country;
      this.wiki = wiki;
    }
  }
  
  export class WeatherData {
    constructor(city, temperature, description, timezone) {
      this.city = city;
      this.temperature = temperature;
      this.description = description;
      this.timezone = timezone;
    }
  
    getTemperatureCelsius() {
      return this.temperature - 273.15;
    }
  
    getLocalTimeAndDate() {
      const offset = this.timezone / 3600;
      const date = new Date();
      date.setHours(date.getHours() + offset - 2);
      const options = {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      const parts = formatter.formatToParts(date);
      const time = `${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}`;
      const weekday = parts.find(p => p.type === 'weekday').value;
      const formattedDate = `${parts.find(p => p.type === 'day').value}/${parts.find(p => p.type === 'month').value}/${parts.find(p => p.type === 'year').value}`;
      return `${time}, ${weekday} ${formattedDate}`;
    }
  
    getTemperatureClass() {
      const tempCelsius = this.getTemperatureCelsius();
      if (tempCelsius > 30) {
        return 'temp-max';
      } else if (tempCelsius > 24) {
        return 'temp-high';
      } else if (tempCelsius > 15) {
        return 'temp-medium';
      } else if (tempCelsius > 0) {
        return 'temp-low';
      } else {
        return 'temp-min';
      }
    }
  }
  