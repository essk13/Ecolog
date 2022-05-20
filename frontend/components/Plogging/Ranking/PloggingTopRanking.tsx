import React from 'react';
// Hooks
import {useNavigation} from '@react-navigation/native';
// Api & Types
import {PloggingRankList} from '../../../api/plogging';
import {RootStackNavigationProp} from '../../../screens/types';
// Components
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const styles = (
  width?: any,
  height?: any,
  radius?: number,
  color?: any,
  mt?: number,
) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      margin: 20,
      padding: 10,
      elevation: 4,
    },
    titleImg: {
      width: width || 30,
      height: height || 30,
    },
    rankTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rankerContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    imgBox: {
      width: width || 100,
      height: height || 100,
      borderRadius: radius || 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color || '#ffffff',
      elevation: 3,
      marginTop: mt || 0,
    },
    img: {
      width: width || 'auto',
      height: height || 'auto',
      borderRadius: radius || 50,
    },
    itemContainer: {
      alignItems: 'center',
    },
    rankNumberBox: {
      width: width || 10,
      height: height || 10,
      borderRadius: radius || 5,
      backgroundColor: color || '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      marginRight: 5,
    },
    rankerNameBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 6,
      marginBottom: 3,
    },
  });

const fontStyles = (size?: any, weight?: any, color?: any, align?: any) =>
  StyleSheet.create({
    rankText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
      textAlign: align || 'auto',
      margin: 6,
    },
    normalText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
      textAlign: align || 'auto',
    },
  });

interface PloggingTopRankingProps {
  rankDataList: PloggingRankList;
}

function PloggingTopRanking({rankDataList}: PloggingTopRankingProps) {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles().mainContainer}>
      <View style={styles().rankTitleContainer}>
        <Image
          style={styles(30, 30).titleImg}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3593/3593645.png',
          }}
        />
        <Text style={fontStyles(18, '600').rankText}>명예의 전당</Text>
      </View>
      <View style={styles().rankerContainer}>
        {rankDataList.length >= 2 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.push('UserProfile', {id: rankDataList[1].user.no})
            }
            style={styles().itemContainer}>
            <View style={styles(70, 70, 35, '#DBDBDB', 10).imgBox}>
              <Image
                style={styles(62, 62, 31).img}
                source={{
                  uri: rankDataList[1].user.image,
                }}
              />
            </View>
            <View style={styles().rankerNameBox}>
              <View style={styles(16, 16, 8, '#DBDBDB').rankNumberBox}>
                <Text style={fontStyles(10, '600').normalText}>2</Text>
              </View>
              <Text style={fontStyles(16, '600').normalText}>
                {rankDataList[1].user.nickname}
              </Text>
            </View>
            <Text style={fontStyles(10, null, '#636363').normalText}>
              {`${rankDataList[1].cnt}회 / ${
                Math.round(rankDataList[1].dist * 100) / 100
              }km`}
            </Text>
          </TouchableOpacity>
        )}
        {rankDataList.length < 2 && (
          <View style={styles().itemContainer}>
            <View style={styles(70, 70, 35, '#DBDBDB', 10).imgBox}>
              <Image
                style={styles(62, 62, 31).img}
                source={{
                  uri: null,
                }}
              />
            </View>
          </View>
        )}
        {rankDataList.length >= 1 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.push('UserProfile', {id: rankDataList[0].user.no})
            }
            style={styles().itemContainer}>
            <View style={styles(80, 80, 40, '#ffec99').imgBox}>
              <Image
                style={styles(72, 72, 36).img}
                source={{
                  uri: rankDataList[0].user.image,
                }}
              />
            </View>
            <View style={styles().rankerNameBox}>
              <View style={styles(16, 16, 8, '#F1DB6A').rankNumberBox}>
                <Text style={fontStyles(10, '600').normalText}>1</Text>
              </View>
              <Text style={fontStyles(16, '600').normalText}>
                {rankDataList[0].user.nickname}
              </Text>
            </View>
            <Text style={fontStyles(10, null, '#636363').normalText}>
              {`${rankDataList[0].cnt}회 / ${
                Math.round(rankDataList[0].dist * 100) / 100
              }km`}
            </Text>
          </TouchableOpacity>
        )}
        {rankDataList.length === 0 && (
          <View style={styles().itemContainer}>
            <View style={styles(80, 80, 40, '#ffec99').imgBox}>
              <Image
                style={styles(72, 72, 36).img}
                source={{
                  uri: null,
                }}
              />
            </View>
          </View>
        )}
        {rankDataList.length >= 3 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.push('UserProfile', {id: rankDataList[2].user.no})
            }
            style={styles().itemContainer}>
            <View style={styles(70, 70, 35, '#D4A590', 10).imgBox}>
              <Image
                style={styles(62, 62, 31).img}
                source={{
                  uri: rankDataList[2].user.image,
                }}
              />
            </View>
            <View style={styles().rankerNameBox}>
              <View style={styles(16, 16, 8, '#D4A590').rankNumberBox}>
                <Text style={fontStyles(10, '600').normalText}>3</Text>
              </View>
              <Text style={fontStyles(16, '600').normalText}>
                {rankDataList[2].user.nickname}
              </Text>
            </View>
            <Text style={fontStyles(10, null, '#636363').normalText}>
              {`${rankDataList[2].cnt}회 / ${
                Math.round(rankDataList[2].dist * 100) / 100
              }km`}
            </Text>
          </TouchableOpacity>
        )}
        {rankDataList.length < 3 && (
          <View style={styles().itemContainer}>
            <View style={styles(70, 70, 35, '#D4A590', 10).imgBox}>
              <Image
                style={styles(62, 62, 31).img}
                source={{
                  uri: null,
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export default PloggingTopRanking;
