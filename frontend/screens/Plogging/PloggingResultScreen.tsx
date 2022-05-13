import React, {useEffect, useRef, useState} from 'react';
// Hooks
import {useQuery} from 'react-query';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// Api & Types
import {getPloggingDetail} from '../../api/plogging';
import {RootStackNavigationProp, RootStackParamList} from '../types';
// Components
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const styles = (marginL?: any, marginR?: any, justify?: any, align?: any) =>
  StyleSheet.create({
    loadingContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      padding: 20,
      justifyContent: justify || 'flex-start',
      alignItems: align || 'flex-start',
      backgroundColor: '#ffffff',
    },
    scrollContainer: {
      backgroundColor: '#ffffff',
      paddingBottom: 10,
    },
    img: {
      width: 300,
      height: 300,
      marginLeft: marginL || 0,
      marginRight: marginR || 0,
      borderRadius: 10,
    },
    btn: {
      width: 220,
      height: 45,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cccccc',
      borderRadius: 10,
    },
  });

const fontStyles = (size?: any, weight?: any, color?: any, align?: any) =>
  StyleSheet.create({
    recordText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
      textAlign: align || 'auto',
    },
    loadingText: {
      fontSize: 20,
      color: Colors.blueA100,
      marginTop: 10,
    },
  });

type PloggingResultScreenRouteProp = RouteProp<
  RootStackParamList,
  'PloggingResult'
>;

function PloggingResultScreen() {
  const route = useRoute<PloggingResultScreenRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {data: ploggingData, isLoading} = useQuery(
    ['ploggingDetail', route.params.id],
    () => getPloggingDetail(route.params.id),
  );
  const [ploggingDate, setPloggingDate] = useState(['0000', '00', '00']);
  const [ploggingTime, setPloggingTime] = useState({
    hour: '00',
    min: '00',
    sec: '00',
  });
  const viewShot = useRef();

  useEffect(() => {
    if (ploggingData) {
      setPloggingDate(ploggingData.ended_at.split(' ')[0].split('-'));
      setPloggingTime({
        hour: String(Math.floor(ploggingData.time / 3600)).padStart(2, '0'),
        min: String(Math.floor((ploggingData.time % 3600) / 60)).padStart(
          2,
          '0',
        ),
        sec: String(ploggingData.time % 60).padStart(2, '0'),
      });
    }
  }, [ploggingData]);

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

  if (!ploggingData || isLoading) {
    return (
      <View style={styles().loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
        <Text style={fontStyles().loadingText}>기록을 불러오는 중</Text>
      </View>
    );
  }

  return (
    <View>
      <ViewShot ref={viewShot} options={{format: 'jpg', quality: 0.9}}>
        <View style={styles().container}>
          <Text
            style={
              fontStyles(30, '600', null).recordText
            }>{`${ploggingDate[0]}년 ${ploggingDate[1]}월 ${ploggingDate[2]}일`}</Text>
          <Text style={fontStyles(20, '600', null).recordText}>총 거리</Text>
          <Text style={fontStyles(24, '600', null).recordText}>
            {ploggingData.distance} km
          </Text>
          <Text style={fontStyles(18, '600', null).recordText}>칼로리</Text>
          <Text style={fontStyles(20, '600', null).recordText}>
            {ploggingData.calories} kcal
          </Text>
          <Text style={fontStyles(18, '600', null).recordText}>경과 시간</Text>
          <Text
            style={
              fontStyles(20, '600', null).recordText
            }>{`${ploggingTime.hour}:${ploggingTime.min}:${ploggingTime.sec}`}</Text>
        </View>
        <ScrollView horizontal={true}>
          <Image
            source={{uri: ploggingData.result_img}}
            style={styles(40).img}
          />
          <Image
            source={{
              uri: ploggingData.route_img,
            }}
            style={styles(30, 40).img}
          />
        </ScrollView>
      </ViewShot>
      <View style={styles(null, null, 'center', 'center').container}>
        <TouchableOpacity onPress={() => onShare()} style={styles().btn}>
          <Text style={fontStyles(20, '600', null).recordText}>공유하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.popToTop();
          }}
          style={styles().btn}>
          <Text style={fontStyles(20, '600', null).recordText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PloggingResultScreen;
