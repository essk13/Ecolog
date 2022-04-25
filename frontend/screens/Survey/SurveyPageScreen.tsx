import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

function SurveyPageScreen({navigation}: any) {
  return (
    <View>
      <Text>This is SurveyPageScreen</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('SurveyResult');
        }}
        underlayColor="red">
        <Text>Go to SurveyResult</Text>
      </TouchableHighlight>
    </View>
  );
}

export default SurveyPageScreen;
