import React from 'react';
import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
// Components
import PloggingTopRanking from '../../components/Plogging/Ranking/PloggingTopRanking';
import PloggingBottomRanking from '../../components/Plogging/Ranking/PloggingBottomRanking';

const styles = (color?: any, marginT?: any, marginL?: any) =>
  StyleSheet.create({
    mainContainer: {
      marginVertical: 20,
      height: '100%',
    },
    imgContainer: {
      width: '100%',
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    headerImg: {
      width: '100%',
      aspectRatio: 2.5,
      marginBottom: 20,
      borderRadius: 10,
    },
    btnContainer: {
      flexDirection: 'row',
      marginTop: marginT || 0,
      paddingHorizontal: 20,
    },
    btnItem: {
      width: 50,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: marginL || 0,
      backgroundColor: color || '#d4d4d4',
      borderRadius: 10,
    },
  });

const fontStyles = (size?: any, weight?: any, color?: any) =>
  StyleSheet.create({
    rankText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
    },
  });

// 샘플 데이터
const rankData = [
  {
    rank: 1,
    name: '박승원',
  },
  {
    rank: 2,
    name: '이종현',
  },
  {
    rank: 3,
    name: '지수연',
  },
  {
    rank: 4,
    name: '이수환',
  },
  {
    rank: 5,
    name: '이재희',
  },
  {
    rank: 6,
    name: '이진곤',
  },
  {
    rank: 7,
    name: 'Unkown',
  },
  {
    rank: 8,
    name: 'Unkown',
  },
  {
    rank: 9,
    name: 'Unkown',
  },
  {
    rank: 10,
    name: 'Unkown',
  },
  {
    rank: 11,
    name: 'Unkown',
  },
  {
    rank: 12,
    name: 'Unkown',
  },
  {
    rank: 13,
    name: 'Unkown',
  },
  {
    rank: 14,
    name: 'Unkown',
  },
  {
    rank: 15,
    name: 'Unkown',
  },
  {
    rank: 16,
    name: 'Unkown',
  },
  {
    rank: 17,
    name: 'Unkown',
  },
  {
    rank: 18,
    name: 'Unkown',
  },
  {
    rank: 19,
    name: 'Unkown',
  },
  {
    rank: 20,
    name: 'Unkown',
  },
];

function PloggingRankingScreen() {
  const topData = rankData.filter(element => element.rank <= 3);
  const bottomData = rankData.filter(element => element.rank > 3);
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

      <View style={styles().btnContainer}>
        <Text style={fontStyles(18, '600').rankText}>플로거 랭킹</Text>
        <TouchableOpacity style={styles(null, null, 10).btnItem}>
          <Text style={fontStyles(null, '400').rankText}>친구</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles(null, null, 10).btnItem}>
          <Text style={fontStyles(null, '400').rankText}>전체</Text>
        </TouchableOpacity>
      </View>

      <View style={styles(null, 10).btnContainer}>
        <TouchableOpacity style={styles('#bdd7ff').btnItem}>
          <Text style={fontStyles(null, '400').rankText}>주간</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles('#bdd7ff', null, 10).btnItem}>
          <Text style={fontStyles(null, '400').rankText}>월간</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles('#bdd7ff', null, 10).btnItem}>
          <Text style={fontStyles(null, '400').rankText}>누적</Text>
        </TouchableOpacity>
      </View>

      <PloggingTopRanking rankData={topData} />

      <PloggingBottomRanking rankData={bottomData} />
    </View>
  );
}

export default PloggingRankingScreen;
