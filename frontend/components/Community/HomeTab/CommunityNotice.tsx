import React from 'react';
// Hooks
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
// Api & Types
import {CommunityDetail, getPostList, Post} from '../../../api/community';
import {RootState} from '../../../modules';
// Components
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator, Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  loadingContainer: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    color: '#000000',
  },
  postDate: {
    color: '#919191',
  },
  create: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1,
    backgroundColor: '#5FA2E5',
    borderRadius: 100,
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

  if (!myInfo.data || !campaignListData || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {myInfo.data.email === data.manager.email && (
        <TouchableOpacity
          style={styles.create}
          onPress={() =>
            navigation.navigate('PostCreate', {data: data, type: 1})
          }>
          <Icon name="plus" size={23} color="#FFF" />
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
