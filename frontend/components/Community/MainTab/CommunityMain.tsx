import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {Community} from '../../../api/community';
import {useQuery} from 'react-query';
import {getCommunityList} from '../../../api/community';
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

interface CommunityItemProps {
  navigation: any;
  community: Community;
}

const hotItem = ({item}: any) => {
  return (
    <View style={styles.hotItem}>
      <Text>{item}</Text>
    </View>
  );
};
function HotCommu({navigation, community}: CommunityItemProps) {
  return (
    <View style={styles.hotCommu}>
      <Text>{community.title}</Text>
      <Text>{community.no}</Text>
      <Text>{community.manager.email}</Text>
    </View>
  );
}
function MyItem({navigation, community}: CommunityItemProps) {
  return (
    <View style={styles.myItem}>
      <Text>{community.title}</Text>
      <Text>{community.no}</Text>
      <Text>{community.manager.email}</Text>
    </View>
  );
}
function CommunityMain({navigation}: any) {
  const hotdata = [
    '용기내챌린지',
    '챌린저',
    '마스터',
    '그마',
    '플로깅챌린지',
    '아이스버킷챌린지',
  ];

  const {data: communityListData} = useQuery('CommunityList', getCommunityList);
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
        data={communityListData}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}: any) => (
          <HotCommu navigation={navigation} community={item} />
        )}
      />
      <Text>내 커뮤니티</Text>
      <FlatList
        style={styles.myListContainer}
        data={communityListData}
        renderItem={({item}: any) => (
          <MyItem navigation={navigation} community={item} />
        )}
      />
    </View>
  );
}

export default CommunityMain;
