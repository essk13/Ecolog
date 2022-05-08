import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {PloggingRankList} from '../../../api/plogging';

const styles = (width?: any, height?: any, radious?: number, color?: any) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: '#5FA2E5',
      borderRadius: 10,
      margin: 20,
      padding: 10,
    },
    rankerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingHorizontal: 10,
    },
    img: {
      width: width || 'auto',
      height: height || 'auto',
      borderRadius: radious || 0,
      borderWidth: 5,
      borderColor: color || '#696969',
      marginBottom: 10,
    },
    itemContainer: {
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

interface PloggingTopRankingProps {
  rankDataList: PloggingRankList;
}

function PloggingTopRanking({rankDataList}: PloggingTopRankingProps) {
  return (
    <View style={styles().mainContainer}>
      <Text style={fontStyles(16, '600').rankText}>명예의 전당</Text>
      <View style={styles().rankerContainer}>
        <View style={styles().itemContainer}>
          {rankDataList.length >= 2 && (
            <>
              <Image
                style={styles(70, 70, 100, '#DBDBDB').img}
                source={{
                  uri: rankDataList[1].user.image,
                }}
              />
              <Text style={fontStyles(null, '600').rankText}>
                {`2 ${rankDataList[1].user.name}`}
              </Text>
            </>
          )}
          {rankDataList.length < 2 && (
            <Image
              style={styles(70, 70, 100, '#DBDBDB').img}
              source={{
                uri: null,
              }}
            />
          )}
        </View>
        <View style={styles().itemContainer}>
          {rankDataList.length >= 1 && (
            <>
              <Image
                style={styles(80, 80, 100, '#F1DB6A').img}
                source={{
                  uri: rankDataList[0].user.image,
                }}
              />
              <Text style={fontStyles(null, '600').rankText}>
                {`1 ${rankDataList[0].user.name}`}
              </Text>
            </>
          )}
          {rankDataList.length === 0 && (
            <Image
              style={styles(80, 80, 100, '#F1DB6A').img}
              source={{
                uri: null,
              }}
            />
          )}
        </View>
        <View style={styles().itemContainer}>
          {rankDataList.length >= 3 && (
            <>
              <Image
                style={styles(70, 70, 100, '#D4A590').img}
                source={{
                  uri: rankDataList[2].user.image,
                }}
              />
              <Text style={fontStyles(null, '600').rankText}>
                {`3 ${rankDataList[2].user.name}`}
              </Text>
            </>
          )}
          {rankDataList.length < 3 && (
            <Image
              style={styles(70, 70, 100, '#D4A590').img}
              source={{
                uri: null,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default PloggingTopRanking;
