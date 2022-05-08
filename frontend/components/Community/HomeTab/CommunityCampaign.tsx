import React from 'react';
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
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
interface CommunityDetailProps {
  data: CommunityDetail;
}
interface CampaignItemProps {
  post: Post;
}

function CommunityCampaign({data}: CommunityDetailProps) {
  const navigation = useNavigation<any>();
  const PromListItem = ({post}: CampaignItemProps) => {
    const navigation = useNavigation<any>();
    return (
      <Card style={styles.CardContainer}>
        <Card.Content>
          <Title>{post.title}</Title>
        </Card.Content>
        <Card.Actions>
          <Text>{post.content}</Text>
          <Text>{post.no}</Text>
          <Button
            onPress={() =>
              navigation.navigate('PostDetail', {
                id: post.no,
                no: data.no,
              })
            }>
            상세 보기
          </Button>
        </Card.Actions>
      </Card>
    );
  };
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
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CampaignCreate', {data: data})}>
        <Text>생성</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.Container}
        data={campaignListData}
        renderItem={({item}: any) => <PromListItem post={item} />}
      />
    </View>
  );
}

export default CommunityCampaign;
