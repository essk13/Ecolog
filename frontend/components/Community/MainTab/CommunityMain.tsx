import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Community,
  getCommunityList,
  getHotCommunityList,
} from '../../../api/community';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    height: 120,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#cecece',
    borderWidth: 1,
    overflow: 'hidden',
  },
  hotItem: {
    width: 100,
    height: '100%',
    backgroundColor: '#ffffff',
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
    height: '65%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
    backgroundColor: '#bbbbbb',
    marginBottom: 0,
  },
  hotItemTitle: {
    height: '25%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: '#bbbbbb',
  },
  ItemContent: {
    marginLeft: 'auto',
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: '#5f5f5f',
  },
  menuTitle: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14,
  },
  hotItemSelectedFont: {
    color: '#ffffff',
  },
  hotItemFont: {
    color: '#000000',
    fontSize: 13,
  },
  hotCommuCount: {
    color: '#797979',
    fontSize: 12,
  },
  hotCommuTitle: {
    color: '#000000',
    fontSize: 14,
  },
  commuTextTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  commuTextCount: {
    color: '#b6b6b6',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 'auto',
  },
  commuTextTag: {
    color: '#ffffff',
    fontSize: 13,
  },
  commuTextdes: {
    color: '#c9c9c9',
    fontSize: 13,
    fontWeight: '600',
  },
  commuTagBox: {
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 'auto',
    marginLeft: 'auto',
    borderRadius: 5,
    backgroundColor: 'rgba(97, 97, 97,0.5)',
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
          <Text style={styles.hotItemSelectedFont}>#{item}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => touchTag()} style={styles.hotItem}>
          <Text style={styles.hotItemFont}>#{item}</Text>
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
          <Text style={styles.hotCommuTitle}>{community.title}</Text>
          <Text style={styles.hotCommuCount}>
            <Icon name="user" size={13} color="#d4d4d4" />{' '}
            {community.join_count}
          </Text>
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
            <ImageBackground
              blurRadius={3}
              source={{uri: community.image}}
              style={styles.image}>
              <View style={styles.ItemContent}>
                <View style={{flexDirection: 'row', height: '20%'}}>
                  <Text style={styles.commuTextTitle}>{community.title}</Text>
                  <Text style={styles.commuTextCount}>
                    <Icon name="user" size={13} color="#d4d4d4" />{' '}
                    {community.join_count}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', height: '80%', paddingTop: 10}}>
                  <Text style={styles.commuTextdes}>
                    {community.description}
                  </Text>
                  <View style={styles.commuTagBox}>
                    <Text style={styles.commuTextTag}>#{community.tag}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        {!tagSearch.on && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommunityHome', {id: community.no})
            }
            style={styles.myItem}>
            <ImageBackground
              blurRadius={3}
              source={{uri: community.image}}
              style={styles.image}>
              <View style={styles.ItemContent}>
                <View style={{flexDirection: 'row', height: '20%'}}>
                  <Text style={styles.commuTextTitle}>{community.title}</Text>
                  <Text style={styles.commuTextCount}>
                    <Icon name="user" size={13} color="#d4d4d4" />{' '}
                    {community.join_count}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', height: '80%', paddingTop: 10}}>
                  <Text style={styles.commuTextdes}>
                    {community.description}
                  </Text>
                  <View style={styles.commuTagBox}>
                    <Text style={styles.commuTextTag}>#{community.tag}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
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
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5FA2E5',
      borderRadius: 100,
    },
  });
  const navigation = useNavigation<any>();
  return (
    <View style={mainStyles.container}>
      <TouchableOpacity
        style={mainStyles.createButton}
        onPress={() => navigation.navigate('CommunityCreate')}>
        {/* 글쓰기 버튼 */}
        <Icon name="plus" size={23} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.menuTitle}>인기 태그</Text>
      <FlatList
        style={mainStyles.tagContainer}
        horizontal={true}
        data={hotCampaignData}
        renderItem={hotItem}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.menuTitle}>인기 커뮤니티</Text>
      <FlatList
        style={mainStyles.hotContainer}
        horizontal={true}
        data={hotCommunity}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}: any) => (
          <HotCommu community={item} tagSearch={searchOn} />
        )}
      />
      <Text style={styles.menuTitle}>검색 결과 {keyword}</Text>
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
