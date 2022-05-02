import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  img: {
    width: '100%',
    aspectRatio: 0.75,
  },
  campaign: {
    width: 100,
    height: 40,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  hotContainer: {
    height: '10%',
    flexGrow: 0,
    marginBottom: 10,
  },
  hotCommuContainer: {
    height: '40%',
    flexGrow: 0,
    marginBottom: 10,
  },
  myItem: {
    height: 150,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  hotItem: {
    width: 80,
    height: '100%',
    backgroundColor: 'grey',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotCommu: {
    width: 100,
    backgroundColor: 'grey',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myListContainer: {
    flexGrow: 0,
    width: '100%',
  },
});
const myItem = ({item}: any) => {
  return (
    <View style={styles.myItem}>
      <Text>{item}</Text>
    </View>
  );
};
const hotItem = ({item}: any) => {
  return (
    <View style={styles.hotItem}>
      <Text>{item}</Text>
    </View>
  );
};
const hotCommu = ({item}: any) => {
  return (
    <View style={styles.hotCommu}>
      <Text>{item}</Text>
    </View>
  );
};
function CommunityMain() {
  const hotdata = [
    '용기내챌린지',
    '챌린저',
    '마스터',
    '그마',
    '플로깅챌린지',
    '아이스버킷챌린지',
  ];
  const hotcommu = [
    '커뮤니티1',
    '커뮤니티12',
    '커뮤니티15',
    '커뮤니티17',
    '커뮤니티81',
  ];
  const mydata = [
    '커뮤니티1',
    '커뮤니티12',
    '커뮤니티15',
    '커뮤니티17',
    '커뮤니티81',
  ];
  return (
    <View style={styles.contentContainer}>
      <Text>인기 캠페인</Text>
      <FlatList
        style={styles.hotContainer}
        horizontal={true}
        data={hotdata}
        renderItem={hotItem}
        showsHorizontalScrollIndicator={false}
      />
      <Text>인기 커뮤니티</Text>
      <FlatList
        style={styles.hotCommuContainer}
        horizontal={true}
        data={hotcommu}
        renderItem={hotCommu}
        showsHorizontalScrollIndicator={false}
      />
      <Text>내 커뮤니티</Text>
      <FlatList
        style={styles.myListContainer}
        data={mydata}
        renderItem={myItem}
      />
    </View>
  );
}

export default CommunityMain;
