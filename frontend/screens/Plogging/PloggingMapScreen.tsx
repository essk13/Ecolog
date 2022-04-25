import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

function PloggingMapScreen({navigation}: any) {
  return (
    <View>
      <Text>This is PloggingMap</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('PloggingResult');
        }}
        underlayColor="red">
        <Text>Go to Result</Text>
      </TouchableHighlight>
    </View>
  );
}

export default PloggingMapScreen;
