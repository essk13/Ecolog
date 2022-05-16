import React from 'react';
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
import {CommunityDetail, getPostList, Post} from '../../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {RootState} from '../../../modules';
const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  listContainer: {
    flexGrow: 0,
    width: '100%',
    minHeight: '100%',
  },
  CardContainer: {
    padding: 15,
    borderColor: '#cfcfcf',
    borderBottomWidth: 1,
  },
  image: {
    width: '100%',
    height: '50%',
  },
  postTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '800',
  },
  postDate: {
    color: '#919191',
  },
  create: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
interface CommunityDetailProps {
  data: CommunityDetail;
}
interface CampaignItemProps {
  post: Post;
}

function CommunityNotice({data}: CommunityDetailProps) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<any>();
  const PromListItem = ({post}: CampaignItemProps) => {
    const date = post.created_at.split('T');
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PostDetail', {
            id: post.no,
            no: data.no,
            type: 1,
          })
        }
        style={styles.CardContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDate}>{date[0]} </Text>
      </TouchableOpacity>
    );
  };
  const {data: campaignListData, isLoading} = useQuery(
    ['postList', {no: data.no, type: 'notice'}],
    () => getPostList({no: data.no, type: 'notice'}),
  );
  if (!campaignListData || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {myInfo.data?.email === data.manager.email && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PostCreate', {data: data, type: 1})
          }
          style={styles.create}>
          {/* 글쓰기 버튼 */}
          <Text>생성</Text>
        </TouchableOpacity>
      )}
      <FlatList
        style={styles.listContainer}
        data={campaignListData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => <PromListItem post={item} />}
      />
    </View>
  );
}

export default CommunityNotice;
