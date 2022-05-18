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
import Icon from 'react-native-vector-icons/FontAwesome';

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
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5FA2E5',
    borderRadius: 100,
  },
  cardImg: {
    height: 180,
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
    color: '#d1d1d1',
    fontWeight: 'bold',
  },
  titleContainer: {
    marginBottom: 5,
    marginTop: 5,
  },
  itemContent: {
    marginLeft: 'auto',
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        <ImageBackground
          blurRadius={5}
          source={{uri: campaign.image}}
          style={styles.cardImg}>
          <View style={styles.itemContent}>
            <Text style={styles.count}>{campaign.location}</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{campaign.title}</Text>
            </View>
            <Text style={styles.count}>
              {campaign.max_personnel - joinCount}명 남음
            </Text>
          </View>
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
        <Icon name="plus" size={23} color="#FFF" />
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
