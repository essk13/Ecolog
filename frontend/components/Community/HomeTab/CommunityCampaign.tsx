import React from 'react';
// Hooks
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
// Api & Types
import {CommunityDetail, getPostList, Post} from '../../../api/community';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator, Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  loadingContainer: {
    flexGrow: 0,
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
      </View>
    );
  }

  const items = campaignListData.map(post => (
    <TouchableOpacity
      key={post.no}
      style={styles.propsContainer}
      onPress={() =>
        navigation.navigate('PostDetail', {
          id: post.no,
          no: data.no,
          type: 3,
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
