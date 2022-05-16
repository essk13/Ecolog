import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  CommunityDetail,
  getCampaignList,
  Campaign,
} from '../../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 0,
    width: '100%',
    Height: '100%',
  },
  Container: {
    flexGrow: 0,
    minHeight: '100%',
    width: '100%',
    padding: 10,
  },
  CardContainer: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  create: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1,
  },
  cardImg: {
    height: 180,
    padding: 20,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  countContainer: {
    borderColor: '#ffffff',
    borderWidth: 2,
    padding: 3,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 5,
  },
  count: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  titleContainer: {
    marginBottom: 5,
    marginTop: 5,
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
    const joinCount = campaign.join_personnel.length;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CampaignDetail', {
            id: campaign.no,
            no: data.no,
          })
        }
        style={styles.CardContainer}>
        <ImageBackground source={{uri: campaign.image}} style={styles.cardImg}>
          <Text>{campaign.location}</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{campaign.title}</Text>
          </View>
          <Text style={styles.count}>
            {joinCount} / {campaign.max_personnel}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
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
    <View style={styles.listContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CampaignCreate', {data: data})}
        style={styles.create}>
        {/* 글쓰기 버튼 */}
        <Text>생성</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.Container}
        data={campaignListData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => <PromListItem campaign={item} />}
      />
    </View>
  );
}

export default CommunityPromotion;
