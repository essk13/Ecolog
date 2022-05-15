import React from 'react';
import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  result: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4D4D4D',
  },
  img: {
    width: '75%',
    aspectRatio: 1,
    marginTop: '10%',
    marginBottom: '5%',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4D4D4D',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '600',
    marginLeft: 10,
    color: '#4D4D4D',
  },
  button: {
    flexDirection: 'row',
    width: '70%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
  },
  close: {
    marginBottom: 30,
    marginLeft: 'auto',
  },
});
function SurveyResultScreen({route}: any) {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.close}
        onPress={() => {
          navigation.popToTop();
        }}>
        <Icon name="close" size={28} color="#4D4D4D" />
      </TouchableOpacity>

      <Text style={styles.result}>당신의 점수는 {route.params.result} 점!</Text>
      {route.params.result <= 20 && (
        <>
          <Image
            style={styles.img}
            source={{
              uri: 'https://static.turbosquid.com/Preview/2014/07/06__11_06_13/Earth_02.jpg5ff92b55-0180-4a1c-96aa-4d811825b41aLarge.jpg',
            }}
          />
          <Text style={styles.resultText}>지구를 망치고있군요!</Text>
          <Text style={styles.resultText}>
            작은 것 부터 하나씩 실천해보면 어떨까요?
          </Text>
        </>
      )}
      {route.params.result > 20 && route.params.result <= 50 && (
        <>
          <Image
            style={styles.img}
            source={{
              uri: 'https://cdn2.vectorstock.com/i/1000x1000/87/01/world-planet-earth-kawaii-character-vector-15838701.jpg',
            }}
          />
          <Text style={styles.resultText}>작은 것 부터 실천하고 계시군요!</Text>
          <Text style={styles.resultText}>
            우리 조금 더 환경을 신경써볼까요?
          </Text>
        </>
      )}
      {route.params.result > 50 && route.params.result <= 80 && (
        <>
          <Image
            style={styles.img}
            source={{
              uri: 'https://img.freepik.com/free-vector/cute-funny-earth-character-with-dumbbells_464314-988.jpg?w=2000',
            }}
          />
          <Text style={styles.resultText}>아주 잘하고 있어요!</Text>
          <Text style={styles.resultText}>
            에코로그를 통해 보다 멋진 지구를 만들어 주세요!
          </Text>
        </>
      )}
      {route.params.result > 80 && (
        <>
          <Image
            style={styles.img}
            source={{
              uri: 'https://cdn1.vectorstock.com/i/1000x1000/55/15/planet-earth-cartoon-character-with-sunglasses-vector-31575515.jpg',
            }}
          />
          <Text style={styles.resultText}>당신은 지구 지킴이!</Text>
          <Text style={styles.resultText}>
            앞으로도 쭉 멋진 모습 기대할께요!
          </Text>
        </>
      )}

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Icon name="sharealt" size={25} color="#4D4D4D" />
        <Text style={styles.buttonText}>공유하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SurveyPage');
        }}
        style={styles.button}>
        <Icon name="reload1" size={25} color="#4D4D4D" />
        <Text style={styles.buttonText}>다시하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SurveyResultScreen;
