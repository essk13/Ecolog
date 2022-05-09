import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';
import {CommunityDetail, getPostList, Post} from '../../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
const styles = StyleSheet.create({
  Container: {
    flexGrow: 0,
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  CardContainer: {
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '50%',
  },
});

interface CampaignItemProps {
  post: Post;
}

function CommunityFeed() {
  const navigation = useNavigation<any>();
  const PromListItem = ({post}: CampaignItemProps) => {
    return (
      <Card style={styles.CardContainer}>
        <Image source={{uri: post.image}} style={styles.image} />
        <Card.Content>
          <Title>{post.title}</Title>
        </Card.Content>
        <Card.Actions>
          <Text>{post.content}</Text>
          <Text>{post.no}</Text>
        </Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate('PostDetail', {
              id: post.no,
              no: 0,
            })
          }>
          상세 보기
        </Button>
      </Card>
    );
  };
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
  return (
    <View>
      <FlatList
        style={styles.Container}
        data={campaignListData}
        renderItem={({item}: any) => <PromListItem post={item} />}
      />
    </View>
  );
}

export default CommunityFeed;
