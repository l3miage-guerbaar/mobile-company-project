import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';

import Accueil from './screens/Accueil';
import DetailsVille from './components/DetailsVille';
import Actualites from './components/Actualites';
import Favoris from './screens/Favoris';
import Resultats from './screens/Resultats';

const Stack = createStackNavigator();

const App = (): JSX.Element => {

    const navigationTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: require('./assets/fluffy-clouds-in-a-light-blue-sky-on-a-clear-summer-day.jpg'),
        },
    };

    return (
        <NavigationContainer theme={navigationTheme}>
            <View style={styles.container}>
                <Stack.Navigator initialRouteName="Accueil">
                    <Stack.Screen name="Accueil" component={Accueil}/>
                    <Stack.Screen name="Resultats" component={Resultats}/>
                    <Stack.Screen name="Favoris" component={Favoris}/>
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 60,
        backgroundColor: 'white',
    },
    headerButton: {
        paddingHorizontal: 10,
    },
    headerButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default App;
