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
import Icon from 'react-native-vector-icons/AntDesign';

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
        <Text style={fontStyles().loadingText}>????????? ???????????? ???</Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={styles().back}
        onPress={() => {
          navigation.popToTop();
        }}>
        <Icon name="close" size={28} color="#4D4D4D" />
      </TouchableOpacity>

      <Text style={fontStyles(23, '600', null).titleText}>????????? ??????</Text>
      <ViewShot
        ref={viewShot}
        options={{format: 'jpg', quality: 0.9}}
        style={{backgroundColor: '#FFF'}}>
        <View style={styles(20, 20).container}>
          <Text
            style={
              fontStyles(28, '600', null).recordText
            }>{`${ploggingDate[0]}??? ${ploggingDate[1]}??? ${ploggingDate[2]}???`}</Text>
          <View style={styles().resultContainer}>
            <View style={{marginTop: 10}}>
              <Text style={fontStyles(16, '500', '#5D5D5D').recordText}>
                ??? ??????
              </Text>
              <Text style={fontStyles(20, '800', '#5FA2E5').recordText}>
                {Math.round(ploggingData.distance * 100) / 100} km
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={fontStyles(16, '500', '#5D5D5D').recordText}>
                ?????????
              </Text>
              <Text style={fontStyles(20, '800', '#5FA2E5').recordText}>
                {ploggingData.calories} kcal
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={fontStyles(16, '500', '#5D5D5D').recordText}>
                ????????? ??????
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
        <TouchableOpacity onPress={() => onShare()} style={styles().btn}>
          <Icon
            name="sharealt"
            size={20}
            color="#FFF"
            style={{marginRight: 10}}
          />
          <Text style={fontStyles(20, '600', '#FFF').recordText}>????????????</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          style={styles().btn}>
          <Icon
            name="export"
            size={20}
            color="#FFF"
            style={{marginRight: 10}}
          />
          <Text style={fontStyles(20, '600', '#FFF').recordText}>??????</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PloggingResultScreen;
