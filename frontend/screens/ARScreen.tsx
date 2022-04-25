import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

function ARScreen() {
  return (
    <View>
      <Text>AR</Text>
      <TouchableHighlight onPress={() => {}} underlayColor="red">
        <Text>This is Red Highlight Button</Text>
      </TouchableHighlight>
    </View>
  );
}

export default ARScreen;
