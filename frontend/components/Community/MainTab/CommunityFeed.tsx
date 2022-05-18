import React from 'react';
// Hooks
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
// Api & Types
import {getPostList, Post} from '../../../api/community';
// Components
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

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
  loadingContainer: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
      </View>
    );
  }

  const items = campaignListData.map((post, index) => (
    <TouchableOpacity
      key={index}
      style={styles.propsContainer}
      onPress={() =>
        navigation.navigate('PostDetail', {
          id: post.no,
          no: post.community_no,
          type: 3,
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
