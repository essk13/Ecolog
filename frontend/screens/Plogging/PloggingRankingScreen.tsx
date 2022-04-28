import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    mainContainer: {
      margin: 20,
    },
    imgContainer: {
      width: '100%',
      alignItems: 'center',
    },
    headerImg: {
      width: '100%',
      aspectRatio: 2,
      marginBottom: 20,
      borderRadius: 10,
    },
  });

const fontStyles = (size?: number, weight?: any, color?: any) =>
  StyleSheet.create({
    rankText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
    },
  });

function PloggingRankingScreen() {
  return (
    <View style={styles().mainContainer}>
      <View style={styles().imgContainer}>
        <Image
          style={styles().headerImg}
          source={{
            uri: 'https://cdn.itbiznews.com/news/photo/202111/55365_50621_652.png',
          }}
        />
      </View>

      <View>
        <Text style={fontStyles(18, '600').rankText}>플로깅 랭킹</Text>
      </View>
    </View>
  );
}

export default PloggingRankingScreen;
