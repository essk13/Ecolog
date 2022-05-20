import React, {useRef} from 'react';
import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../screens/types';
// Share
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

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
    width: 250,
    height: 280,
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
    color: '#FFF',
  },
  button: {
    flexDirection: 'row',
    width: '70%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#5FA2E5',
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
  const viewShot = useRef();

  const onShare = async () => {
    try {
      const uri = await getPhotoUri();
      const options = {
        title: 'title',
        message: 'message',
        url: uri,
        type: 'image/jpeg',
      };
      await Share.open(options);
    } catch (error) {}
  };

  const getPhotoUri = async (): Promise<string> => {
    const uri = await viewShot.current?.capture();
    return uri;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.close}
        onPress={() => {
          navigation.popToTop();
        }}>
        <Icon name="close" size={28} color="#4D4D4D" />
      </TouchableOpacity>

      <ViewShot
        ref={viewShot}
        options={{format: 'jpg', quality: 0.9}}
        style={{backgroundColor: '#FFF', width: '100%', alignItems: 'center'}}>
        <Text style={styles.result}>
          당신의 점수는 {route.params.result} 점!
        </Text>
        {route.params.result <= 20 && (
          <>
            <Image
              style={styles.img}
              source={require('../../assets/survey/survey_0.png')}
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
              source={require('../../assets/survey/survey_1.png')}
            />
            <Text style={styles.resultText}>
              작은 것 부터 실천하고 계시군요!
            </Text>
            <Text style={styles.resultText}>
              우리 조금 더 환경을 신경써볼까요?
            </Text>
          </>
        )}
        {route.params.result > 50 && route.params.result <= 80 && (
          <>
            <Image
              style={styles.img}
              source={require('../../assets/survey/survey_2.png')}
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
              source={require('../../assets/survey/survey_3.png')}
            />
            <Text style={styles.resultText}>당신은 지구 지킴이!</Text>
            <Text style={styles.resultText}>
              앞으로도 쭉 멋진 모습 기대할께요!
            </Text>
          </>
        )}
      </ViewShot>

      <TouchableOpacity
        onPress={() => {
          onShare();
        }}
        style={styles.button}>
        <Icon name="sharealt" size={25} color="#FFF" />
        <Text style={styles.buttonText}>공유하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SurveyPage');
        }}
        style={styles.button}>
        <Icon name="reload1" size={25} color="#FFF" />
        <Text style={styles.buttonText}>다시하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SurveyResultScreen;
