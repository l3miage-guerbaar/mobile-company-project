import React from 'react';
import {Text, View} from 'react-native';
import {Ville} from "../types/types";
import MapView, { Marker } from 'react-native-maps';

interface DetailsVilleProps {
    ville: Ville;
}

const DetailsVille = (detailsVilleProps: DetailsVilleProps) => {

    const latitude = detailsVilleProps.ville.latitude;
    const longitude = detailsVilleProps.ville.longitude;

    return (
        <View>
            <Text>{detailsVilleProps.ville.name}</Text>

        </View>
    );
};

export default DetailsVille;