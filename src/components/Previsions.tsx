import React, { useState, useRef } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, Image} from 'react-native';
import { ForecastData, WeatherData } from "../types/types";

interface PrevisionProps {
  forecast: ForecastData;
  weatherData: WeatherData;
}

const Previsions = (previsionProps: PrevisionProps) => {
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(
      previsionProps.forecast.list[0]
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const handleButtonPress = (weather: WeatherData) => {
    setSelectedWeather(weather);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress(previsionProps.weatherData)}
          >
            <Text style={styles.buttonText}>Voir météo actuelle</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.weatherContainer}
            showsVerticalScrollIndicator={false}
        >
          {selectedWeather ? (
              <View style={styles.weather}>
                <Text style={styles.city}>{selectedWeather.name}</Text>
                <Text style={styles.weatherDate}>
                  {new Date(selectedWeather.dt * 1000).toLocaleString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Text>
                <Text style={styles.weatherDescription}>
                  {selectedWeather.weather[0].description}
                </Text>
                <Text style={styles.temperature}>
                  {Math.round(selectedWeather.main.temp)}°C
                </Text>
                <Image
                    style={styles.weatherIcon}
                    source={{
                      uri: `https://openweathermap.org/img/wn/${selectedWeather.weather[0].icon}@2x.png`,
                    }}
                />
                <Text style={styles.parameterLabel}>
                  Ressenti : {Math.round(selectedWeather.main.feels_like)}°C
                </Text>
                <Text style={styles.parameterLabel}>
                  Vent : {selectedWeather.wind.speed} m/s
                </Text>
                <Text style={styles.parameterLabel}>
                  Humidité : {selectedWeather.main.humidity}%
                </Text>
                <Text style={styles.parameterLabel}>
                  Pression : {selectedWeather.main.pressure} hPa
                </Text>
              </View>
          ) : (
              <Text style={styles.noWeatherText}>
                Sélectionnez une prévision pour afficher les détails.
              </Text>
          )}

          <Text style={styles.forecastTitle}>Prévisions des prochains jours</Text>
          {previsionProps.forecast.list?.map((weather: WeatherData, index: number) => (
              <TouchableOpacity
                  key={index}
                  style={[
                    styles.forecastItem,
                    selectedWeather === weather && styles.selectedForecastItem,
                  ]}
                  onPress={() => handleButtonPress(weather)}
              >
                <Text style={styles.forecastDate}>
                  {new Date(weather.dt * 1000).toLocaleString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Text>
                <Text style={styles.forecastTemperature}>
                  {Math.round(weather.main.temp)}°C
                </Text>

                <Text style={styles.forecastDescription}>
                  {weather.weather[0].description}
                </Text>

                <Image
                    style={styles.weatherIcon}
                    source={{
                      uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    }}
                />
              </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  weatherIcon: {
    width: 70,
    height: 70,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: 'lightblue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherContainer: {
    flexGrow: 1,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather: {
    alignItems: 'center',
    marginBottom: 16,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  weatherDate: {
    fontSize: 18,
    marginBottom: 8,
  },
  weatherDescription: {
    fontSize: 18,
    marginBottom: 8,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  parameterLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  noWeatherText: {
    fontSize: 16,
    textAlign: 'center',
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  forecastItem: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    height: 80,
    width: 350,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  forecastDate: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  forecastTemperature: {
    flex: 1,
    fontSize: 16,
    position: "absolute",
    bottom: 10,
    marginLeft: 10,
  },
  forecastDescription: {
    flex: 1,
    fontSize: 16,
    position: "absolute",
    bottom: 10,
    marginLeft: 100,
  },
  selectedForecastItem: {
    backgroundColor: 'lightblue',
  },
});

export default Previsions;
