import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: '40%',
    fontSize: 30,
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'rgb(0, 242, 96)',
    width: '55%',
    height: '10%',
    marginTop: '60%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
});
function SurveyScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ECO MBTI 테스트</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          navigation.navigate('SurveyPage');
        }}>
        <Text style={styles.buttonText}>시작하기</Text>
      </Button>
    </View>
  );
}

export default SurveyScreen;
