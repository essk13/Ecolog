import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

function PloggingScreen({navigation}: any) {
  return (
    <View>
      <Text>Plogging</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('PloggingMap');
        }}
        underlayColor="red">
        <Text>Go to Map</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('PloggingRanking');
        }}
        underlayColor="red">
        <Text>Go to Ranking</Text>
      </TouchableHighlight>
    </View>
  );
}

export default PloggingScreen;
