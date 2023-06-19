import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NINJA_API_CITY, NINJA_API_CITY_URL, WEATHER_API_KEY, WEATHER_API_URL} from '../Api';
import {Ville, WeatherData} from "../types/types";

const Accueil = ({navigation}: PropsWithChildren<any>): JSX.Element => {
    const [villes, setVilles] = useState<Ville[]>([]);
    const [searchText, setSearchText] = useState('');

    const [selectedVille, setSelectedVille] = useState<Ville>({
        country: "",
        is_capital: false,
        latitude: 0,
        longitude: 0,
        name: "",
        population: 0
    });
    const [currentWeatherData, setCurrentWeatherData] = useState<Record<string, WeatherData>>({});

    useEffect(() => {
        fetchVilles().then(() => console.log("Recupération villes dans l'accueil OK \n"));
    }, [searchText]);

    useEffect(() => {
        if (villes.length > 0) {
            fetchWeatherData(villes[0]).then(() => console.log("Récupération météo data dans l'accueil OK \n"));
        }
    }, [villes]);

    const fetchVilles = async (): Promise<void> => {
        const response = await fetch(`${NINJA_API_CITY_URL}/city?name=${searchText}&country=FR&limit=10`, NINJA_API_CITY);
        const data = await response.json();
        setVilles(data);
        if (data.length > 0) {
            await fetchWeatherForAllVilles(data);
        }
    };

    const fetchWeatherData = async (ville: Ville): Promise<WeatherData> => {
        const response = await fetch(`${WEATHER_API_URL}/weather?lat=${ville.latitude}&lon=${ville.longitude}&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await response.json();

        setCurrentWeatherData(prevData => ({
            ...prevData,
            [`${ville.latitude},${ville.longitude}`]: data
        }));
        return data;
    };

    const fetchWeatherForAllVilles = async (villes: Ville[]): Promise<void> => {
        const promises = villes.map((ville) =>
            fetchWeatherData(ville).catch((error) => {
                console.log(`Failed to fetch weather data for ${ville.name}: ${error}`);
            })
        );
        await Promise.all(promises);
    };

    const openDetailsVille = (ville: Ville): void => {
        const weatherData = currentWeatherData[`${ville.latitude},${ville.longitude}`];
        setSelectedVille(ville);

        navigation.navigate('Resultats', {ville, weatherData});
    };

    const getCardStyle = (temperature: number) => {
        let cardStyle = styles.coldCard;

        if (temperature > 20) {
            cardStyle = styles.hotCard;
        } else if (temperature > 10) {
            cardStyle = styles.mediumCard;
        }

        return cardStyle;
    };

    const roundTemperature = (temperature: number): string => {
        return Math.round(temperature).toString();
    };

    const renderVilleItem = (ville: Ville) => {
        const weatherData = currentWeatherData[`${ville.latitude},${ville.longitude}`];
        const temperature = weatherData ? roundTemperature(weatherData.main.temp) : null;
        const cardStyle = temperature ? getCardStyle(Number(temperature)) : styles.coldCard;

        return (
            <TouchableOpacity style={[styles.villeItem, cardStyle]} onPress={() => openDetailsVille(ville)}>
                {weatherData && weatherData.weather && weatherData.weather.length > 0 ? (
                    <>
                        <Image
                            style={styles.weatherIcon}
                            source={{
                                uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                            }}
                        />
                        <View style={styles.tempContainer}>
                            <Text style={styles.tempText}>{temperature}°C</Text>
                        </View>
                    </>
                ) : (
                    <View style={styles.tempContainer}>
                        <Text style={styles.tempText}>No data</Text>
                    </View>
                )}
                <Text style={styles.villeName}>{ville.name}</Text>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
            <Button title="Favoris" onPress={() => navigation.navigate('Favoris')}/>
            <TextInput
                placeholder="Rechercher une ville..."
                value={searchText}
                onChangeText={setSearchText}
                style={{borderWidth: 1, padding: 10, marginTop: 10}}
            />
            <FlatList
                data={villes}
                renderItem={({item}) => renderVilleItem(item)}
                keyExtractor={(item: Ville) => item.name}
                numColumns={2}
                decelerationRate="fast"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 10,
        height: 300,
    },
    villeItem: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        padding: 40,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    coldCard: {
        backgroundColor: '#b3e5fc',
    },
    mediumCard: {
        backgroundColor: '#ffcc80',
    },
    hotCard: {
        backgroundColor: '#ef9a9a',
    },
    tempContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
    },
    tempText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    villeName: {
        position:"absolute",
        top:1,
        left:1,
        marginTop:10,
        marginLeft:10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    TextInput: {
        borderWidth: 5,
        padding: 10,
        marginTop: 10,
        margin: 5,
        backgroundColor: "white"
    },
    weatherIcon: {
        bottom:1,
        right:1,
        marginBottom:-10,
        width: 70,
        height: 70,
        position:"absolute",
    }
});

export default Accueil;