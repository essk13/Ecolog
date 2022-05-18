import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CommunityDetail, getPostList, Post} from '../../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  Container: {
    flexGrow: 0,
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  CardContainer: {
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#929292',
  },
  itemContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 2,
  },
  propsContainer: {
    width: '33.3%',
    borderColor: '#ffffff',
    borderWidth: 0.5,
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
});
interface CommunityDetailProps {
  data: CommunityDetail;
}
interface CampaignItemProps {
  post: Post;
}

function CommunityCampaign({data}: CommunityDetailProps) {
  const navigation = useNavigation<any>();

  const {data: campaignListData, isLoading} = useQuery(
    ['postList', {no: data.no, type: 'campaign'}],
    () => getPostList({no: data.no, type: 'campaign'}),
  );
  if (!campaignListData || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }

  const items = campaignListData.map(post => (
    <TouchableOpacity
      style={styles.propsContainer}
      onPress={() =>
        navigation.navigate('PostDetail', {
          id: post.no,
          no: 0,
        })
      }>
      <Image source={{uri: post.image}} style={styles.image} />
    </TouchableOpacity>
  ));

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.create}
        onPress={() =>
          navigation.navigate('PostCreate', {data: data, type: 3})
        }>
        {/* 글쓰기 버튼 */}
        <Icon name="plus" size={23} color="#FFF" />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <View style={styles.itemContainer}>{items}</View>
      </ScrollView>
    </View>
  );
}

export default CommunityCampaign;
