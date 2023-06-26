import React, { PropsWithChildren, useState } from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet, Button} from 'react-native';
import { FavorisItem, Ville } from "../types/types";

interface FavorisProps {
    favoriteVilles: FavorisItem[];
    updateFavoriteVilles: (favoriteVilles: FavorisItem[]) => void;
}

const Favoris = ({ navigation, route }: PropsWithChildren<any>): JSX.Element => {
    const { favoriteVilles, updateFavoriteVilles } = route.params as FavorisProps;
    const [favoriteVillesList, setFavoriteVillesList] = useState<FavorisItem[]>(favoriteVilles);

    const handleDeleteVille = (ville: Ville): void => {
        const updatedFavoriteVilles = favoriteVillesList?.filter(
            (favVille) => favVille.ville !== ville
        );
        setFavoriteVillesList(updatedFavoriteVilles);
        updateFavoriteVilles(updatedFavoriteVilles);
    };

    const renderVilleItem = (favorisItem: FavorisItem) => {
        const { ville, weatherData } = favorisItem;
        return (
            <View style={styles.villeItem}>
                <Text style={styles.villeName}>{ville.name}</Text>
                <Button title="Voir Météo" onPress={() => navigation.navigate('Resultats', { ville, weatherData })} />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteVille(ville)}
                >
                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des villes favorites</Text>
            <FlatList
                data={favoriteVillesList}
                renderItem={({ item }) => renderVilleItem(item)}
                keyExtractor={(item: FavorisItem) => item?.ville.name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    villeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    villeName: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Favoris;
