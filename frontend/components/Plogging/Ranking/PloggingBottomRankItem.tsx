import React from 'react';
// Hooks
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// Api & Types
import {PloggingRank} from '../../../api/plogging';
import {RootState} from '../../../modules';
import {RootStackNavigationProp} from '../../../screens/types';
// Components
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = (color?: any) =>
  StyleSheet.create({
    touchableContainer: {
      width: '100%',
    },
    mainContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderColor: '#aaaaaa',
      borderBottomWidth: 0.2,
      backgroundColor: color || 'none',
    },
    itemContainer: {
      height: 55,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rankBox: {
      width: 22,
      marginRight: 10,
      alignItems: 'center',
    },
    profileImgBox: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
      elevation: 3,
    },
    profileImg: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
  });

const fontStyles = (size?: any, weight?: any, color?: any, align?: any) =>
  StyleSheet.create({
    rankText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
      textAlign: align || 'auto',
    },
  });

interface PloggingBottomRankItemProps {
  rank: number;
  rankData: PloggingRank;
}

function PloggingBottomRankItem({rank, rankData}: PloggingBottomRankItemProps) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View>
      {/* 본인 랭킹 */}
      {myInfo.data && rankData.user.no === myInfo.data.no && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.push('UserProfile', {id: rankData.user.no})}
          style={styles().touchableContainer}>
          <LinearGradient
            colors={['rgba(123, 255, 176, 0.7)', 'rgba(125, 190, 255, 0.7)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles().mainContainer}>
            <View style={styles().itemContainer}>
              <View style={styles().rankBox}>
                <Text style={fontStyles(16, '600').rankText}>{rank}</Text>
              </View>
              <View style={styles().profileImgBox}>
                <Image
                  style={styles().profileImg}
                  source={{uri: rankData.user.image}}
                />
              </View>
              <Text style={fontStyles(null, '600').rankText}>
                {rankData.user.name}
              </Text>
            </View>
            <Text style={fontStyles(11, null, '#000000').rankText}>
              {`${rankData.cnt}회 / ${rankData.dist}km`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* 타인 랭킹 */}
      {myInfo.data && rankData.user.no !== myInfo.data.no && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.push('UserProfile', {id: rankData.user.no})}
          style={styles().mainContainer}>
          <View style={styles().itemContainer}>
            <View style={styles().rankBox}>
              <Text style={fontStyles(16, '600').rankText}>{rank}</Text>
            </View>
            <View style={styles().profileImgBox}>
              <Image
                style={styles().profileImg}
                source={{uri: rankData.user.image}}
              />
            </View>
            <Text style={fontStyles(null, '600').rankText}>
              {rankData.user.name}
            </Text>
          </View>
          <Text style={fontStyles(11, null, '#636363').rankText}>
            {`${rankData.cnt}회 / ${rankData.dist}km`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default PloggingBottomRankItem;
