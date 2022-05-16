import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Community,
  getCommunityList,
  getHotCommunityList,
} from '../../../api/community';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
const styles = StyleSheet.create({
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
  // 그림자 효과
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
    overflow: 'hidden',
  },

  hotimage: {
    height: '80%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
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
  hotItemSelected: {
    width: 100,
    height: '100%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#cecece',
    borderWidth: 1,
    backgroundColor: '#28c222',
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
  const [searchOn, setSearchOn] = React.useState({on: false, key: ''});

  const hotItem = ({item}: any) => {
    const touchTag = () => {
      if (searchOn.on && item === searchOn.key) {
        setSearchOn({on: false, key: ''});
      } else {
        setSearchOn({on: true, key: item});
      }
    };
    if (searchOn.key === item) {
      return (
        <TouchableOpacity
          onPress={() => touchTag()}
          style={styles.hotItemSelected}>
          <Text>{item}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => touchTag()} style={styles.hotItem}>
          <Text>{item}</Text>
        </TouchableOpacity>
      );
    }
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
  const mainStyles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      padding: 10,
      justifyContent: 'flex-start',
    },
    tagContainer: {
      height: '6%',
      marginTop: 10,
      marginBottom: 10,
      flexGrow: 0,
    },
    hotContainer: {
      height: '25%',
      marginTop: 10,
      marginBottom: 10,
      flexGrow: 0,
    },
    myListContainer: {
      marginTop: 10,
      width: '100%',
      height: '60%',
    },
    createButton: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      zIndex: 1,
    },
  });
  const navigation = useNavigation<any>();
  return (
    <View style={mainStyles.container}>
      <TouchableOpacity
        style={mainStyles.createButton}
        onPress={() => navigation.navigate('CommunityCreate')}>
        {/* 글쓰기 버튼 */}
        <Text>생성</Text>
      </TouchableOpacity>
      <Text>인기 태그</Text>
      <FlatList
        style={mainStyles.tagContainer}
        horizontal={true}
        data={hotCampaignData}
        renderItem={hotItem}
        showsHorizontalScrollIndicator={false}
      />
      <Text>인기 커뮤니티</Text>
      <FlatList
        style={mainStyles.hotContainer}
        horizontal={true}
        data={hotCommunity}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}: any) => (
          <HotCommu community={item} tagSearch={searchOn} />
        )}
      />
      <Text>{keyword}</Text>
      <FlatList
        style={mainStyles.myListContainer}
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
