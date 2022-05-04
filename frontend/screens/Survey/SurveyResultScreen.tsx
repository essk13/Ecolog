import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    fontSize: 30,
    fontWeight: '700',
  },
});
function SurveyResultScreen({route}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.result}>
        당신의 점수는 {route.params.result} 점입니다.
      </Text>
    </View>
  );
}

export default SurveyResultScreen;
