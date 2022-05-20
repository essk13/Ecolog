import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dialog, Portal, Provider} from 'react-native-paper';

function SurveyPageScreen({navigation}: any) {
  const [step, setStep] = React.useState(0);
  const [point, setPoint] = React.useState([]);
  const [result, setResult] = React.useState(0);
  // 뒤로가기
  const [backDialog, setBackDialog] = useState<boolean>(false);
  const survey = [
    {
      q: '1. 페트병 분리수거 시 당신의 행동은?',
      a1: '라벨을 제거하고 버린다',
      a2: '그냥 버린다',
      s1: 10,
      s2: 0,
      img: require('../../assets/survey/q1.jpg'),
    },
    {
      q: '2. 나무젓가락을 잘못 뜯은 상황에서 당신의 행동은?',
      a1: '새걸 뜯는다',
      a2: '그냥 쓴다',
      s1: 0,
      s2: 10,
      img: require('../../assets/survey/q2.jpg'),
    },
    {
      q: '3. 음식물이 묻은 플라스틱 용기를 버릴 때 당신의 행동은?',
      a1: '씻어서 분리수거한다',
      a2: '그냥 버린다',
      s1: 10,
      s2: 0,
      img: require('../../assets/survey/q3.jpg'),
    },
    {
      q: '4. 음식 배달 주문 시 당신의 행동은?',
      a1: '일회용 수저를 수령한다',
      a2: '집에 있는 수저를 사용한다',
      s1: 0,
      s2: 10,
      img: require('../../assets/survey/q4.jpg'),
    },
    {
      q: '5. 쓰레기를 버려야하는데 주변에 쓰레기통이 없다. 당신의 행동은?',
      a1: '쓰레기통을 찾아 버린다',
      a2: '그냥 길에 버린다',
      s1: 10,
      s2: 0,
      img: require('../../assets/survey/q5.jpg'),
    },
    {
      q: '6. 계란 껍데기는 음식물 쓰레기이다.',
      a1: '아니다',
      a2: '맞다',
      s1: 10,
      s2: 0,
      img: require('../../assets/survey/q6.jpg'),
    },
    {
      q: '7. 길을 가다 바닥에 버려진 쓰레기를 발견했다. 당신의 행동은?',
      a1: '주워서 쓰레기통에 버린다',
      a2: '나도 길에 버린다',
      s1: 10,
      s2: 0,
      img: require('../../assets/survey/q7.jpg'),
    },
    {
      q: '8. 사용하고 남은 고추장을 버리려고 한다. 당신의 선택은?',
      a1: '당연히 음식물쓰레기!',
      a2: '아니다 일반쓰레기다!',
      s1: 0,
      s2: 10,
      img: require('../../assets/survey/q8.jpg'),
    },
    {
      q: '9. 폐형광등을 버리려고 한다. 당신의 행동은?',
      a1: '깨서 일반쓰레기로 버린다',
      a2: '폐형광등 수거함에 버린다',
      s1: 0,
      s2: 10,
      img: require('../../assets/survey/q9.jpg'),
    },
    {
      q: '10. 아래 유리병을 분리수거하려고 한다. 당신의 행동은?',
      a1: '뚜껑을 분리하여 버린다',
      a2: '그냥 뚜껑이랑 같이 버린다',
      s1: 0,
      s2: 10,
      img: require('../../assets/survey/q10.jpg'),
    },
  ];

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const handleBackPress = () => {
    setBackDialog(true);
    return true;
  };

  const routeNext = (p: number) => {
    setResult(result + p);
    setPoint([...point, p]);
    if (step === 9) {
      navigation.navigate('SurveyResult', {result: result + p});
      setPoint([]);
      setStep(0);
      setResult(0);
    } else {
      setStep(step + 1);
    }
  };
  const routePrev = () => {
    if (step !== 0) {
      setResult(result - point[point.length - 1]);
      setStep(step - 1);
      setPoint(point.slice(0, point.length - 1));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    question: {
      fontSize: 25,
      fontWeight: '700',
      marginTop: '10%',
      color: '#4D4D4D',
    },
    button: {
      backgroundColor: 'rgb(0, 242, 96)',
      width: '80%',
      height: '8%',
      marginTop: '10%',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#000',
      fontSize: 20,
      fontWeight: '600',
    },
    back: {
      marginTop: 15,
      marginRight: 'auto',
    },
    img: {
      width: 300,
      height: 300,
      marginTop: '10%',
      marginBottom: '5%',
      borderRadius: 5,
    },
    dialogContainer: {
      height: 200,
      borderRadius: 20,
      backgroundColor: '#ffffff',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      elevation: 5,
      paddingTop: 10,
    },
    buttonContainer: {
      width: 120,
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      marginHorizontal: 10,
      elevation: 4,
    },
  });

  const fontStyles = (size?: number, weight?: any, align?: any, color?: any) =>
    StyleSheet.create({
      textStyle: {
        fontSize: size || 15,
        fontWeight: weight || 'normal',
        color: color || '#000000',
        textAlign: align || 'auto',
      },
    });

  return (
    <Provider>
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.back}
          onPress={() => {
            routePrev();
          }}>
          <Icon name="arrow-back-ios" size={28} color="#4D4D4D" />
        </TouchableHighlight>
        <Text style={styles.question}>{survey[step].q}</Text>
        <Image style={styles.img} source={survey[step].img} />
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            routeNext(survey[step].s1);
          }}>
          <Text style={styles.buttonText}>{survey[step].a1}</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            routeNext(survey[step].s2);
          }}>
          <Text style={styles.buttonText}>{survey[step].a2}</Text>
        </Button>
        <Portal>
          <Dialog
            style={styles.dialogContainer}
            visible={backDialog}
            onDismiss={() => setBackDialog(false)}>
            <Text style={fontStyles(22, 'bold').textStyle}>
              설문을 종료하시겠습니까?
            </Text>
            <Dialog.Actions>
              <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.6}
                onPress={() => setBackDialog(false)}>
                <Icon name="play-arrow" size={22} color="#5FA2E5" />
                <Text style={fontStyles(22, '600').textStyle}>계속</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.6}
                onPress={() => navigation.pop()}>
                <Icon name="stop" size={22} color="#5FA2E5" />
                <Text style={fontStyles(22, '600').textStyle}>종료</Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

export default SurveyPageScreen;
