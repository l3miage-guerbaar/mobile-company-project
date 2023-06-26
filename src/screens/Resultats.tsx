import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DetailsVille from '../components/DetailsVille';
import Previsions from '../components/Previsions';
import { ForecastData, Ville, WeatherData, NewsData } from "../types/types";
import { WEATHER_API_KEY, WEATHER_API_URL, NEWS_API_KEY, NEWS_API_URL } from "../Api";
import Actualite from "../components/Actualites";

const Resultats = ({ route }: any) => {
    const [activeTab, setActiveTab] = useState('previsions');
    const { ville, weatherData } = route.params;
    const [forecastData, setForecastData] = useState<ForecastData>({
        city: {
            coord: { lat: 0, lon: 0 },
            country: "",
            id: 0,
            name: "",
            population: 0,
            sunrise: 0,
            sunset: 0,
            timezone: 0
        }, cnt: 0, cod: "", list: [], message: 0
    });
    const [newsData, setNewsData] = useState<NewsData>({
        status: "",
        totalResults: 0,
        articles: []
    });

    useEffect(() => {
        fetchForecastWeatherData(ville).then(() => console.log("Recupération ForecastWeatherData dans resultats OK \n"));
        fetchActualites(ville).then((data) => {
            console.log("Recupération des actualités dans resultats OK \n");
            setNewsData(data);
        });
    }, []);

    const fetchForecastWeatherData = async (ville: Ville): Promise<void> => {
        const forecastFetch = await fetch(`${WEATHER_API_URL}/forecast?lat=${ville.latitude}&lon=${ville.longitude}&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await forecastFetch.json();

        setForecastData(prevData => ({
            ...prevData,
            list: data.list
        }));
    };

    const fetchActualites = async (ville: Ville): Promise<NewsData> => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() ).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const today_format = yyyy + "-" + mm + '-' + dd;
        const response = await fetch(`${NEWS_API_URL}/everything?q=${ville.name}&from=${today_format}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`);
        const data = await response?.json();
        return data;
    };

    const renderComponent = () => {
        switch (activeTab) {
            case 'actualites':
                return <Actualite ville={ville} newsData={newsData} />;
            case 'detailsVille':
                return <DetailsVille ville={ville} />;
            default:
                return <Previsions forecast={forecastData} weatherData={weatherData} />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, activeTab === 'previsions' && styles.activeButton]}
                    onPress={() => setActiveTab('previsions')}
                >
                    <Text style={styles.buttonText}>Prévisions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, activeTab === 'detailsVille' && styles.activeButton]}
                    onPress={() => setActiveTab('detailsVille')}
                >
                    <Text style={styles.buttonText}>Détails de la ville</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, activeTab === 'actualites' && styles.activeButton]}
                    onPress={() => setActiveTab('actualites')}
                >
                    <Text style={styles.buttonText}>Actualités</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.componentContainer}>{renderComponent()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    activeButton: {
        backgroundColor: 'lightblue',
        borderColor: 'black',
    },
    buttonText: {
        color: 'black',
    },
    componentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Resultats;
