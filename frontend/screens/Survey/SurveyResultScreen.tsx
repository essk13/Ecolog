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
          ????????? ????????? {route.params.result} ???!
        </Text>
        {route.params.result <= 20 && (
          <>
            <Image
              style={styles.img}
              source={require('../../assets/survey/survey_0.png')}
            />
            <Text style={styles.resultText}>????????? ??????????????????!</Text>
            <Text style={styles.resultText}>
              ?????? ??? ?????? ????????? ??????????????? ?????????????
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
              ?????? ??? ?????? ???????????? ????????????!
            </Text>
            <Text style={styles.resultText}>
              ?????? ?????? ??? ????????? ???????????????????
            </Text>
          </>
        )}
        {route.params.result > 50 && route.params.result <= 80 && (
          <>
            <Image
              style={styles.img}
              source={require('../../assets/survey/survey_2.png')}
            />
            <Text style={styles.resultText}>?????? ????????? ?????????!</Text>
            <Text style={styles.resultText}>
              ??????????????? ?????? ?????? ?????? ????????? ????????? ?????????!
            </Text>
          </>
        )}
        {route.params.result > 80 && (
          <>
            <Image
              style={styles.img}
              source={require('../../assets/survey/survey_3.png')}
            />
            <Text style={styles.resultText}>????????? ?????? ?????????!</Text>
            <Text style={styles.resultText}>
              ???????????? ??? ?????? ?????? ???????????????!
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
        <Text style={styles.buttonText}>????????????</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SurveyPage');
        }}
        style={styles.button}>
        <Icon name="reload1" size={25} color="#FFF" />
        <Text style={styles.buttonText}>????????????</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SurveyResultScreen;
