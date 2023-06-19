import React, {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';

const Favoris = ({navigation}: PropsWithChildren<any>): JSX.Element =>{

    //const route = useRoute();
    //const { res } = route.params;

  return (
    <View>
      <Text>Page favoris</Text>
    </View>
  );
};

export default Favoris;