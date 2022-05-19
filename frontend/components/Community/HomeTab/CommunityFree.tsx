import React from 'react';
// Hooks
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
// Api & Types
import {CommunityDetail, getPostList, Post} from '../../../api/community';
// Components
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator, Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  loadingContainer: {
    flexGrow: 0,
    Height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5FA2E5',
    borderRadius: 100,
  },
  titleBox: {
    flex: 1,
    marginRight: 5,
  },
  postDate: {
    fontSize: 12,
    color: '#919191',
    marginLeft: 'auto',
  },
  postTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '800',
    color: '#000000',
  },
});

interface CampaignItemProps {
  post: Post;
  data: CommunityDetail;
}

const PromListItem = ({post, data}: CampaignItemProps) => {
  const date = post.created_at.split('T');
  const navigation = useNavigation<any>();

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
      <Image source={{uri: post.writer.image}} style={styles.image} />
      <View style={styles.titleBox}>
        <Text style={styles.postTitle} numberOfLines={1}>
          {post.title}
        </Text>

        <Text style={{color: '#a8a8a8'}}>{post.writer.nickname}</Text>
      </View>
      <Text style={styles.postDate}>{date[0]}</Text>
    </TouchableOpacity>
  );
};

interface CommunityDetailProps {
  data: CommunityDetail;
}

function CommunityFree({data}: CommunityDetailProps) {
  const navigation = useNavigation<any>();
  const {data: campaignListData, isLoading} = useQuery(
    ['postList', {no: data.no, type: 'free'}],
    () => getPostList({no: data.no, type: 'free'}),
  );

  if (!campaignListData || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostCreate', {data: data, type: 2})}
        style={styles.create}>
        <Icon name="plus" size={23} color="#FFF" />
      </TouchableOpacity>
      <FlatList
        style={styles.Container}
        data={campaignListData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => <PromListItem post={item} data={data} />}
      />
    </View>
  );
}

export default CommunityFree;
