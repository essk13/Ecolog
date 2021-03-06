import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: '10%',
    fontSize: 30,
    fontWeight: '600',
    color: '#4D4D4D',
  },
  button: {
    backgroundColor: 'rgb(0, 242, 96)',
    width: '55%',
    height: '10%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
  img: {
    width: 300,
    height: 228,
    marginTop: '15%',
    marginBottom: '15%',
  },
});

function SurveyScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>에코지수 테스트</Text>
      <Image
        style={styles.img}
        source={require('../assets/survey/survey_4.png')}
      />
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
