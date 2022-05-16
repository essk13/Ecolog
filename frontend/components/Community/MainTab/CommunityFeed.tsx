import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';
import {CommunityDetail, getPostList, Post} from '../../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
const styles = StyleSheet.create({
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
});

interface CampaignItemProps {
  post: Post;
}

function CommunityFeed() {
  const navigation = useNavigation<any>();
  const {data: campaignListData, isLoading} = useQuery(
    ['postList', {no: 0, type: 'campaign'}],
    () => getPostList({no: 0, type: 'campaign'}),
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
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.itemContainer}>{items}</View>
    </ScrollView>
  );
}

export default CommunityFeed;
