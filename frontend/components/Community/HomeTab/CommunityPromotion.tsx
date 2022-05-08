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
import {
  CommunityDetail,
  getCampaignList,
  Campaign,
} from '../../../api/community';
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
  campaign: Campaign;
}

function CommunityPromotion({data}: CommunityDetailProps) {
  const navigation = useNavigation<any>();
  const PromListItem = ({campaign}: CampaignItemProps) => {
    const navigation = useNavigation<any>();
    return (
      <Card style={styles.CardContainer}>
        <Image source={{uri: campaign.image}} style={styles.image} />
        <Card.Content>
          <Title>{campaign.title}</Title>
        </Card.Content>
        <Card.Actions>
          <Text>{campaign.location}</Text>
          <Text>{campaign.content}</Text>
          <Text>{campaign.no}</Text>
          <Button
            onPress={() =>
              navigation.navigate('CampaignDetail', {
                id: campaign.no,
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
    ['campaignList', data.no],
    () => getCampaignList(data.no),
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
        renderItem={({item}: any) => <PromListItem campaign={item} />}
      />
    </View>
  );
}

export default CommunityPromotion;
