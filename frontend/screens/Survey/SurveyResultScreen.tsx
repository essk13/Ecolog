import React from 'react';
import {Text, View} from 'react-native';

function SurveyResultScreen({route}: any) {
  console.log(route);
  return (
    <View>
      <Text>{route.params.result}</Text>
      <Text>This is SurveyResultScreen</Text>
    </View>
  );
}

export default SurveyResultScreen;
