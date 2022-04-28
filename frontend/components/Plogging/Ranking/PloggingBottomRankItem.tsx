import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

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

interface RankItem {
  rank: number;
  name: string;
}

function PloggingBottomRankItem(props: RankItem) {
  return (
    <View>
      {/* 본인 랭킹 */}
      {props.name === '이수환' && (
        <View style={styles('rgba(47, 235, 63, 0.5)').mainContainer}>
          <View style={styles().itemContainer}>
            <View style={styles().rankBox}>
              <Text style={fontStyles(18, '600').rankText}>{props.rank}</Text>
            </View>
            <Text style={fontStyles(null, '600').rankText}>{props.name}</Text>
          </View>
          <Text style={fontStyles(13, null, '#636363').rankText}>
            15회 / 20km
          </Text>
        </View>
      )}

      {/* 타인 랭킹 */}
      {props.name !== '이수환' && (
        <View style={styles().mainContainer}>
          <View style={styles().itemContainer}>
            <View style={styles().rankBox}>
              <Text style={fontStyles(18, '600').rankText}>{props.rank}</Text>
            </View>
            <Text style={fontStyles(null, '600').rankText}>{props.name}</Text>
          </View>
          <Text style={fontStyles(13, null, '#636363').rankText}>
            15회 / 20km
          </Text>
        </View>
      )}
    </View>
  );
}

export default PloggingBottomRankItem;
