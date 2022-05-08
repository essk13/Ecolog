import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {PloggingRank} from '../../../api/plogging';
import {RootState} from '../../../modules';

const styles = (color?: any) =>
  StyleSheet.create({
    mainContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderColor: '#696969',
      borderBottomWidth: 0.5,
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
  return (
    <View>
      {/* 본인 랭킹 */}
      {myInfo.data && rankData.user.no === myInfo.data.no && (
        <View style={styles('rgba(47, 235, 63, 0.5)').mainContainer}>
          <View style={styles().itemContainer}>
            <View style={styles().rankBox}>
              <Text style={fontStyles(18, '600').rankText}>{rank}</Text>
            </View>
            <Text style={fontStyles(null, '600').rankText}>
              {rankData.user.name}
            </Text>
          </View>
          <Text style={fontStyles(13, null, '#636363').rankText}>
            {`${rankData.cnt}회 / ${rankData.dist}km`}
          </Text>
        </View>
      )}

      {/* 타인 랭킹 */}
      {myInfo.data && rankData.user.no !== myInfo.data.no && (
        <View style={styles().mainContainer}>
          <View style={styles().itemContainer}>
            <View style={styles().rankBox}>
              <Text style={fontStyles(18, '600').rankText}>{rank}</Text>
            </View>
            <Text style={fontStyles(null, '600').rankText}>
              {rankData.user.name}
            </Text>
          </View>
          <Text style={fontStyles(13, null, '#636363').rankText}>
            {`${rankData.cnt}회 / ${rankData.dist}km`}
          </Text>
        </View>
      )}
    </View>
  );
}

export default PloggingBottomRankItem;
