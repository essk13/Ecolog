import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackNavigationProp, RootStackParamList} from '../types';
import {useQuery} from 'react-query';
import {getPloggingDetail} from '../../api/plogging';

const styles = (marginL?: any, marginR?: any, justify?: any, align?: any) =>
  StyleSheet.create({
    container: {
      padding: 20,
      justifyContent: justify || 'flex-start',
      alignItems: align || 'flex-start',
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
  });

type PloggingRecordScreenRouteProp = RouteProp<
  RootStackParamList,
  'PloggingRecord'
>;

function PloggingRecordScreen() {
  const route = useRoute<PloggingRecordScreenRouteProp>();
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

  if (!ploggingData || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }

  return (
    <View>
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
        <Text style={fontStyles(20, '600', null).recordText}>
          {`${ploggingTime.hour}:${ploggingTime.min}:${ploggingTime.sec}`}
        </Text>
      </View>
      <ScrollView horizontal={true}>
        <Image source={{uri: ploggingData.result_img}} style={styles(40).img} />
        <Image
          source={{
            uri: ploggingData.route_img,
          }}
          style={styles(30, 40).img}
        />
      </ScrollView>
      <View style={styles(null, null, 'center', 'center').container}>
        <TouchableOpacity onPress={() => {}} style={styles().btn}>
          <Text style={fontStyles(20, '600', null).recordText}>공유하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.pop()} style={styles().btn}>
          <Text style={fontStyles(20, '600', null).recordText}>목록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PloggingRecordScreen;
