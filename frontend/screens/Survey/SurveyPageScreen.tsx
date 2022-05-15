import React from 'react';
import {Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

function SurveyPageScreen({navigation}: any) {
  const [step, setStep] = React.useState(0);
  const [point, setPoint] = React.useState([]);
  const [result, setResult] = React.useState(0);
  const survey = [
    {
      q: '1. 페트병 분리수거 시 당신의 행동은?',
      a1: '라벨을 제거하고 버린다',
      a2: '그냥 버린다',
      s1: 10,
      s2: 0,
      img: 'http://www.newstnt.com/news/photo/202012/68814_63130_4151.jpg',
    },
    {
      q: '2. 나무젓가락을 잘못 뜯은 상황에서 당신의 행동은?',
      a1: '새걸 뜯는다',
      a2: '그냥 쓴다',
      s1: 0,
      s2: 10,
      img: 'https://mblogthumb-phinf.pstatic.net/MjAxODEyMjJfMjE2/MDAxNTQ1NDc0OTA2NTA4.Xis7eo5XMUqaPQ6qlvFIciRxlm8tD_GncgBqgrrYzs8g.FRrEDGXwP4YKPlEzcyou_PnBqpTUl8KIqxEyrZZsWasg.JPEG.oksp96/IMG_9788.jpg?type=w800',
    },
    {
      q: '3. 음식물이 묻은 플라스틱 용기를 버릴 때 당신의 행동은?',
      a1: '씻어서 분리수거한다',
      a2: '그냥 버린다',
      s1: 10,
      s2: 0,
      img: 'https://image.kmib.co.kr/online_image/2020/1003/611718110015062582_8.jpg',
    },
    {
      q: '4. 음식 배달 주문 시 당신의 행동은?',
      a1: '일회용 수저를 수령한다',
      a2: '집에 있는 수저를 사용한다',
      s1: 0,
      s2: 10,
      img: 'https://cdn.4th.kr/news/photo/202201/2012450_75533_1912.jpg',
    },
    {
      q: '5. 쓰레기를 버려야하는데 주변에 쓰레기통이 없다. 당신의 행동은?',
      a1: '쓰레기통을 찾아 버린다',
      a2: '그냥 길에 버린다',
      s1: 10,
      s2: 0,
      img: 'https://gnews.gg.go.kr/OP_UPDATA/UP_DATA/_FILEZ/202009/20200928053913011397081.jpg',
    },
    {
      q: '6. 계란 껍데기는 음식물 쓰레기이다.',
      a1: '아니다',
      a2: '맞다',
      s1: 10,
      s2: 0,
      img: 'https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/Jp6/image/rf9Q87WLTLndAXbnGKimylxD9Rs.jpg',
    },
    {
      q: '7. 길을 가다 바닥에 버려진 쓰레기를 발견했다. 당신의 행동은?',
      a1: '주워서 쓰레기통에 버린다',
      a2: '나도 동참한다',
      s1: 10,
      s2: 0,
      img: 'http://newsimg.hankookilbo.com/2016/08/18/201608180477237489_1.jpg',
    },
    {
      q: '8. 사용하고 남은 고추장을 버리려고 한다. 당신의 선택은?',
      a1: '당연히 음식물쓰레기!',
      a2: '아니다 일반쓰레기다!',
      s1: 0,
      s2: 10,
      img: 'https://dafarm.net/data/goods/55/2021/02/190_temp_16127648370430view.jpg',
    },
    {
      q: '9. 폐형광등을 버리려고 한다. 당신의 행동은?',
      a1: '깨서 일반쓰레기로 버린다',
      a2: '폐형광등 수거함에 버린다',
      s1: 0,
      s2: 10,
      img: 'https://t1.daumcdn.net/cfile/tistory/994D2B335ABF98C01B',
    },
    {
      q: '10. 아래 유리병을 분리수거하려고 한다. 당신의 행동은?',
      a1: '뚜껑을 분리하여 버린다',
      a2: '그냥 뚜껑이랑 같이 버린다',
      s1: 0,
      s2: 10,
      img: 'https://blisgo.com/wp-content/uploads/2020/07/%EC%9C%A0%EB%A6%AC%EB%B3%91.jpg',
    },
  ];

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
      width: '75%',
      aspectRatio: 1,
      marginTop: '10%',
      marginBottom: '5%',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.back}
        onPress={() => {
          routePrev();
        }}>
        <Icon name="left" size={28} color="#4D4D4D" />
      </TouchableHighlight>
      <Text style={styles.question}>{survey[step].q}</Text>
      <Image
        style={styles.img}
        source={{
          uri: survey[step].img,
        }}
      />
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
    </View>
  );
}

export default SurveyPageScreen;
