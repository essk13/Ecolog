import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

function CommunityScreen({navigation}: any) {
  return (
    <View>
      <Text>Community</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('CommunityHome');
        }}
        underlayColor="red">
        <Text>Go to CommunityHome</Text>
      </TouchableHighlight>
    </View>
  );
}

export default CommunityScreen;
