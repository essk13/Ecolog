import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CommunityDetail, getPostList, Post} from '../../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 0,
    Height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  Container: {
    flexGrow: 0,
    minHeight: '100%',
    width: '100%',
  },
  CardContainer: {
    padding: 15,
    borderColor: '#cfcfcf',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  image: {
    height: 40,
    aspectRatio: 1,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10,
  },
  create: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1,
  },
  postDate: {
    color: '#919191',
    marginLeft: 'auto',
  },
  postTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '800',
  },
});
interface CommunityDetailProps {
  data: CommunityDetail;
}
interface CampaignItemProps {
  post: Post;
}

function CommunityFree({data}: CommunityDetailProps) {
  const navigation = useNavigation<any>();
  const PromListItem = ({post}: CampaignItemProps) => {
    const date = post.created_at.split('T');
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PostDetail', {
            id: post.no,
            no: data.no,
            type: 2,
          })
        }
        style={styles.CardContainer}>
        <Text style={{color: '#a8a8a8'}}>{post.no}</Text>
        <Image source={{uri: post.image}} style={styles.image} />
        <View>
          <Text style={styles.postTitle}>{post.title}</Text>

          <Text style={{color: '#a8a8a8'}}>{post.writer.nickname}</Text>
        </View>
        <Text style={styles.postDate}>{date[0]}</Text>
      </TouchableOpacity>
    );
  };
  const {data: campaignListData, isLoading} = useQuery(
    ['postList', {no: data.no, type: 'free'}],
    () => getPostList({no: data.no, type: 'free'}),
  );
  if (!campaignListData || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostCreate', {data: data, type: 2})}
        style={styles.create}>
        {/* 글쓰기 버튼 */}
        <Text>생성</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.Container}
        data={campaignListData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => <PromListItem post={item} />}
      />
    </View>
  );
}

export default CommunityFree;
