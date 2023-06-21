import React from 'react';
import { Text, View } from 'react-native';
import { Ville } from "../types/types";

interface DetailsVilleProps {
    ville: Ville;
}

const DetailsVille = (detailsVilleProps: DetailsVilleProps) => {
    const { name, country, population } = detailsVilleProps.ville;

    return (
        <View>
            <Text>Name: {name}</Text>
            <Text>Country: {country}</Text>
            <Text>Population: {population}</Text>
        </View>
    );
};

export default DetailsVille;
