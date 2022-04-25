import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

function SurveyScreen({navigation}: any) {
  return (
    <View>
      <Text>Survey</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('SurveyPage');
        }}
        underlayColor="red">
        <Text>Go to SurveyPage</Text>
      </TouchableHighlight>
    </View>
  );
}

export default SurveyScreen;
