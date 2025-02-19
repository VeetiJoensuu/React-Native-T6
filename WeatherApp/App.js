import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Linking } from 'react-native';
import { getWeatherData, cities } from './api';
import { City } from './functions';
import { styles } from './styles';

export default function App() {
  const [cityList, setCityList] = useState(cities);
  const [weatherData, setWeatherData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(cityList.map(city => getWeatherData(city)));
      const validData = data.filter(item => item);
      validData.sort((a, b) => b.getTemperatureCelsius() - a.getTemperatureCelsius());
      setWeatherData(validData);
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 60000);
    return () => clearInterval(intervalId);
  }, [cityList]);

  const addCity = async () => {
    console.log('addCity function called');
    if (inputValue) {
      console.log(`Adding city: ${inputValue}`);
      const newCity = new City(inputValue, '(added by user)', `https://en.wikipedia.org/wiki/${inputValue}`);
      const newCityList = [...cityList, newCity];
      setCityList(newCityList);

      const newWeatherData = await getWeatherData(newCity);
      if (newWeatherData) {
        const updatedWeatherData = [...weatherData, newWeatherData];
        updatedWeatherData.sort((a, b) => b.getTemperatureCelsius() - a.getTemperatureCelsius());
        setWeatherData(updatedWeatherData);
      }

      setInputValue('');
    } else {
      alert('Please enter a city name.');
    }
    console.log('Updated cityList:', cityList);
  };

  const renderItem = ({ item }) => {
    const city = cityList.find(city => city.name === item.city);
    if (!item || !city) return null;

    const temperatureClass = item.getTemperatureClass();

    return (
      <View style={[styles.cityContainer, styles[temperatureClass]]}>
        <Text
          style={styles.cityName}
          onPress={() => Linking.openURL(city.wiki)}
        >
          {item.city}, {city.country}
        </Text>
        <Text style={styles.temperature}>{item.getTemperatureCelsius().toFixed(2)}°C</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{item.getLocalTimeAndDate()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name (e.g., 'Paris')"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add City" onPress={addCity} />
      </View>
      <Text style={styles.infoText}>Click city name to open Wikipedia article.</Text>
      <FlatList
        data={weatherData}
        keyExtractor={item => item.city}
        renderItem={renderItem}
      />
    </View>
  );
}
