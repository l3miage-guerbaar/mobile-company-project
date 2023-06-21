import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Ville, NewsData, Article } from "../types/types";

interface ActualiteProps {
    ville: Ville;
    newsData: NewsData;
}

const Actualite = (props: ActualiteProps) => {
    const { ville, newsData } = props;
    const { articles } = newsData;

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Actualités de {ville.name}</Text>
            <ScrollView>
                {articles.map((article, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={{ uri: article.urlToImage }} style={styles.image} resizeMode="cover" />
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>{article.title}</Text>
                            <Text style={styles.author}>Auteur: {article.author}</Text>
                            <Text style={styles.description}>{article.description}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f7f7f7',
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 200,
    },
    contentContainer: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    author: {
        fontSize: 16,
        marginBottom: 5,
        color: '#777',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default Actualite;
