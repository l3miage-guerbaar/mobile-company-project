import React from 'react';
import axios from 'axios';
import { Image, StyleSheet, Text, View } from 'react-native';

class ComponentDetail extends React.Component<ComponentDetailType> {
    render(): JSX.Element {


        const var = 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U';

        return (
            <View>
                <Image style={styles.image} source={{uri : {var} }} />
                <Text>Hello word </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 300,
    },
});

export default ComponentDetail;