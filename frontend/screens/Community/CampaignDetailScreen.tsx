import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useQuery} from 'react-query';
import {deleteCampaign, getCampaignDetail} from '../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {useMutation} from 'react-query';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  image: {
    height: '30%',
    width: '50%',
  },
});

function CampaignDetailScreen({route}: any) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<any>();
  const {mutate: campaignDelete} = useMutation(deleteCampaign);
  const {data: data, isLoading} = useQuery(
    ['campaignDetail', route.params.no, route.params.id],
    () => getCampaignDetail(route.params.no, route.params.id),
  );
  if (!data || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
  const deleteCam = () => {
    campaignDelete({
      communitySeq: route.params.no,
      campaignSeq: route.params.id,
    });
    Alert.alert('삭제가 완료되었습니다.');
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: data.image}} style={styles.image} />
      <Text>{data.title}</Text>
      <Text>{data.content}</Text>
      <Text>{data.location}</Text>
      <Text>{data.max_personnel}</Text>
      {data.writer.email === myInfo.data?.email && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CampaignEdit', {
              data: data,
              no: route.params.no,
            })
          }>
          <Text>수정</Text>
        </TouchableOpacity>
      )}
      {data.writer.email === myInfo.data?.email && (
        <TouchableOpacity onPress={() => deleteCam()}>
          <Text>삭제</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CampaignDetailScreen;
