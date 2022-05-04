import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ploggingActions} from '../modules/plogging';
import {useSelector} from 'react-redux';
import {RootState} from '../modules';
// Components
import PloggingRankingInfo from '../components/Plogging/PloggingMain/PloggingRankingInfo';
import PloggingStartButton from '../components/Plogging/PloggingMain/PloggingStartButton';
import PloggingHistoryList from '../components/Plogging/PloggingMain/PloggingHistoryList';

const styles = (color?: any) =>
  StyleSheet.create({
    background: {
      backgroundColor: color,
    },
    rankingContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingRight: '5%',
      width: '100%',
      height: '10%',
    },
    rankingButton: {
      height: '70%',
      width: '15%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bodyContainer: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      height: '65%',
    },
    historyContainer: {
      width: '100%',
      height: '25%',
    },
    historyTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '20%',
      paddingLeft: 20,
      marginBottom: 10,
    },
  });

const imageStyles = (width?: any, height?: any) =>
  StyleSheet.create({
    normalImage: {
      height: height || 50,
      width: width || 50,
    },
  });

const fontStyles = (size?: number, weight?: any, color?: string) =>
  StyleSheet.create({
    title: {
      fontSize: size || 16,
      fontWeight: weight || 'normal',
      color: color || '#000000',
      marginLeft: 6,
    },
  });

function PloggingScreen({navigation}: any) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (myInfo.data) {
      dispatch(ploggingActions.getPloggingListAsync.request(myInfo.data.no));
    }
  }, [dispatch, myInfo.data]);

  return (
    <View style={styles(colors.background).background}>
      <View style={styles().rankingContainer}>
        <PloggingRankingInfo />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('PloggingRanking')}
          style={styles().rankingButton}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1603/1603847.png',
            }}
            style={imageStyles(40, 40).normalImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles().bodyContainer}>
        <Image
          source={{
            uri: 'https://user-images.githubusercontent.com/87461594/165668437-f7141eee-4de2-4f76-bae4-16a9762b7259.png',
          }}
          style={imageStyles(250, 250).normalImage}
        />
        <PloggingStartButton navigation={navigation} />
      </View>
      <View style={styles().historyContainer}>
        <View style={styles().historyTitle}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/87461594/165677425-5336f818-3d3b-4eed-9411-3eb27d5cada4.png',
            }}
            style={imageStyles(25, 25).normalImage}
          />
          <Text style={fontStyles(16, 'bold', '#000000').title}>히스토리</Text>
        </View>
        <PloggingHistoryList navigation={navigation} />
      </View>
    </View>
  );
}

export default PloggingScreen;
