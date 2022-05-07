import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Community} from '../../../api/community';
import {useQuery} from 'react-query';
import {getCommunityList} from '../../../api/community';
import {useNavigation} from '@react-navigation/native';
import {getHotCommunityList} from '../../../api/community';

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    flexGrow: 0,
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
    height: '30%',
    flexGrow: 0,
    marginBottom: 10,
  },
  myItem: {
    height: 150,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
    borderColor: '#cecece',
    borderWidth: 1,
    overflow: 'hidden',
  },
  hotItem: {
    width: 100,
    height: '100%',
    backgroundColor: '#e4e4e4',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#cecece',
    borderWidth: 1,
  },
  hotCommu: {
    width: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#919191',
    borderWidth: 1,
  },
  myListContainer: {
    flexGrow: 0,
    width: '100%',
    Height: '60%',
  },
  hotimage: {
    height: '80%',
    width: '100%',
    backgroundColor: '#bbbbbb',
  },
  hotItemTitle: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '40%',
    width: '100%',
    backgroundColor: '#bbbbbb',
  },
  ItemContent: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface CommunityItemProps {
  community: Community;
  tagSearch: {on: boolean; key: string};
}

interface KeywordProps {
  keyword: string;
}
function CommunityMain({keyword}: KeywordProps) {
  const [searchOn, setSearchOn] = React.useState({on: false, key: 'ㄴㅇㄹ'});

  const hotItem = ({item}: any) => {
    const touchTag = () => {
      if (searchOn.on && item === searchOn.key) {
        setSearchOn({on: false, key: ''});
        console.log(searchOn.key);
      } else {
        setSearchOn({on: true, key: item});
      }
    };
    return (
      <TouchableOpacity onPress={() => touchTag()} style={styles.hotItem}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };
  function HotCommu({community}: CommunityItemProps) {
    const navigation = useNavigation<any>();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CommunityHome', {id: community.no})}
        style={styles.hotCommu}>
        <Image source={{uri: community.image}} style={styles.hotimage} />
        <View style={styles.hotItemTitle}>
          <Text>{community.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  function MyItem({community, tagSearch}: CommunityItemProps) {
    const navigation = useNavigation<any>();
    return (
      <View>
        {tagSearch.on && community.tag === tagSearch.key && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommunityHome', {id: community.no})
            }
            style={styles.myItem}>
            <Image source={{uri: community.image}} style={styles.image} />
            <View style={styles.ItemContent}>
              <Text>{community.title}</Text>

              <Text>{community.description}</Text>
              <Text>{community.join_count}</Text>
              <Text>{community.tag}</Text>
            </View>
          </TouchableOpacity>
        )}
        {!tagSearch.on && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommunityHome', {id: community.no})
            }
            style={styles.myItem}>
            <Image source={{uri: community.image}} style={styles.image} />
            <View style={styles.ItemContent}>
              <Text>{community.title}</Text>
              <Text>{community.description}</Text>
              <Text>{community.join_count}</Text>
              <Text>{community.tag}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  const hotCampaignData = [
    'tag1',
    '용기내',
    '플로깅',
    '고고',
    '제로 웨이스트',
    '트래시태그',
  ];

  const {data: communityListData} = useQuery('CommunityList', getCommunityList);
  const {data: hotCommunity} = useQuery(
    'hotCommunityList',
    getHotCommunityList,
  );
  return (
    <View style={styles.contentContainer}>
      <Text>커뮤니티 생성</Text>
      <Text>인기 태그</Text>
      <FlatList
        style={styles.hotContainer}
        horizontal={true}
        data={hotCampaignData}
        renderItem={hotItem}
        showsHorizontalScrollIndicator={false}
      />
      <Text>인기 커뮤니티</Text>
      <FlatList
        style={styles.hotCommuContainer}
        horizontal={true}
        data={hotCommunity}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}: any) => (
          <HotCommu community={item} tagSearch={searchOn} />
        )}
      />
      <Text>{keyword}</Text>
      <FlatList
        style={styles.myListContainer}
        data={communityListData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => (
          <MyItem community={item} tagSearch={searchOn} />
        )}
      />
    </View>
  );
}

export default CommunityMain;
