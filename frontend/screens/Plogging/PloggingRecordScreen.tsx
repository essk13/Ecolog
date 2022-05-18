import React, {useEffect, useRef, useState} from 'react';
// Hooks
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'react-query';
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
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {RootState} from '../../modules';

const styles = (
  marginL?: any,
  marginR?: any,
  justify?: any,
  align?: any,
  padding?: any,
) =>
  StyleSheet.create({
    loadingContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      padding: padding || 20,
      justifyContent: justify || 'flex-start',
      alignItems: align || 'flex-start',
      backgroundColor: '#ffffff',
      marginLeft: marginL || 0,
      marginRight: marginR || 0,
    },
    scrollContainer: {
      height: 270,
      backgroundColor: '#ffffff',
    },
    img: {
      width: 250,
      height: 250,
      borderRadius: 10,
    },
    imgContainer: {
      height: 250,
      marginLeft: marginL || 0,
      marginRight: marginR || 0,
      elevation: 5,
      borderRadius: 10,
    },
    btn: {
      flexDirection: 'row',
      width: 220,
      height: 45,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5FA2E5',
      borderRadius: 10,
    },
    resultContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    back: {
      margin: 20,
      width: '90%',
      alignItems: 'flex-end',
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
    titleText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
      marginLeft: 40,
    },
    userNick: {
      fontSize: size || 20,
      fontWeight: '600',
      color: color || '#5D5D5D',
      marginBottom: 15,
    },
  });

type PloggingRecordScreenRouteProp = RouteProp<
  RootStackParamList,
  'PloggingRecord'
>;

function PloggingRecordScreen() {
  const myInfo = useSelector((state: RootState) => state.user.user);
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
      <TouchableOpacity
        style={styles().back}
        onPress={() => {
          navigation.pop();
        }}>
        <Icon name="close" size={28} color="#4D4D4D" />
      </TouchableOpacity>

      <Text style={fontStyles(23, '600', null).titleText}>플로깅 로그</Text>
      <ViewShot
        ref={viewShot}
        options={{format: 'jpg', quality: 0.9}}
        style={{backgroundColor: '#FFF'}}>
        <View style={styles(20, 20).container}>
          <Text
            style={
              fontStyles(28, '600', null).recordText
            }>{`${ploggingDate[0]}년 ${ploggingDate[1]}월 ${ploggingDate[2]}일`}</Text>
          <View style={styles().resultContainer}>
            <View style={{marginTop: 10}}>
              <Text style={fontStyles(16, '500', '#5D5D5D').recordText}>
                총 거리
              </Text>
              <Text style={fontStyles(20, '800', '#5FA2E5').recordText}>
                {Math.round(ploggingData.distance * 100) / 100} km
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={fontStyles(16, '500', '#5D5D5D').recordText}>
                칼로리
              </Text>
              <Text style={fontStyles(20, '800', '#5FA2E5').recordText}>
                {ploggingData.calories} kcal
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={fontStyles(16, '500', '#5D5D5D').recordText}>
                플로깅 시간
              </Text>
              <Text style={fontStyles(20, '800', '#5FA2E5').recordText}>
                {`${ploggingTime.hour}:${ploggingTime.min}:${ploggingTime.sec}`}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles().scrollContainer} horizontal={true}>
          <View style={styles(40).imgContainer}>
            <Image
              source={{uri: ploggingData.result_img}}
              style={styles().img}
            />
          </View>
          <View style={styles(30, 40).imgContainer}>
            <Image
              source={{
                uri: ploggingData.route_img,
              }}
              style={styles().img}
            />
          </View>
        </ScrollView>
      </ViewShot>

      <View style={styles(null, null, 'center', 'center', 10).container}>
        {ploggingData.user &&
          myInfo.data &&
          myInfo.data.no !== ploggingData.user.no && (
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text style={fontStyles(null, null, '#5FA2E5', null).userNick}>
                {ploggingData.user.nickname}
              </Text>
              <Text style={fontStyles(17).userNick}> 님의 로그</Text>
            </View>
          )}
        {ploggingData.user &&
          myInfo.data &&
          myInfo.data.no === ploggingData.user.no && (
            <>
              <TouchableOpacity onPress={() => onShare()} style={styles().btn}>
                <Icon
                  name="sharealt"
                  size={20}
                  color="#FFF"
                  style={{marginRight: 10}}
                />
                <Text style={fontStyles(20, '600', '#FFF').recordText}>
                  공유하기
                </Text>
              </TouchableOpacity>
            </>
          )}
        <TouchableOpacity onPress={() => navigation.pop()} style={styles().btn}>
          <Icon
            name="menufold"
            size={20}
            color="#FFF"
            style={{marginRight: 10}}
          />
          <Text style={fontStyles(20, '600', '#FFF').recordText}>목록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PloggingRecordScreen;
