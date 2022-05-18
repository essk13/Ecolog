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
import {
  deleteCampaign,
  getCampaignDetail,
  postCampaignJoin,
} from '../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {useMutation} from 'react-query';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  img: {
    height: '25%',
    width: '100%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'rgb(139, 139, 139)',
    width: '20%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '20%',
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  contentContainer: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  locationContainer: {
    height: '100%',
    flex: 2,
    borderRadius: 10,
    backgroundColor: 'rgb(139, 139, 139)',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  countContainer: {
    height: '100%',
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgb(139, 139, 139)',
  },
  desContainer: {
    height: '15%',
    width: '100%',
    backgroundColor: 'rgb(139, 139, 139)',
    borderRadius: 10,
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 20,
    margin: 30,
    marginLeft: 0,
    marginBottom: 0,
    alignSelf: 'flex-start',
    color: '#000000',
  },
  date: {
    fontSize: 16,
    margin: 20,
    marginTop: 0,
    marginLeft: 0,
    alignSelf: 'flex-start',
    color: '#636363',
  },
});

function CampaignDetailScreen({route}: any) {
  const {mutate: campaignJoin} = useMutation(postCampaignJoin);
  const Join = () => {
    campaignJoin({communityNo: route.params.no, campaignNo: route.params.id});
    Alert.alert('가입이 완료되었습니다.');
  };
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<any>();
  const {mutate: campaignDelete} = useMutation(deleteCampaign);
  const {data: data, isLoading} = useQuery(
    ['campaignDetail', {no: route.params.no, id: route.params.id}],
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
      <Text style={styles.mainTitle}>{data.title}</Text>
      <Text style={styles.date}>
        {data.start_date} ~ {data.end_date}
      </Text>
      <Image source={{uri: data.image}} style={styles.img} />
      <View style={styles.contentContainer}>
        <View style={styles.locationContainer}>
          <Text>{data.location}</Text>
        </View>
        <View style={styles.countContainer}>
          <Text>{data.max_personnel}</Text>
        </View>
      </View>
      <View style={styles.desContainer}>
        <Text>{data.content}</Text>
      </View>
      <TouchableOpacity onPress={() => Join()} style={styles.button}>
        <Text>참가하기</Text>
      </TouchableOpacity>

      {data.writer.email === myInfo.data?.email && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CampaignEdit', {
              data: data,
              no: route.params.no,
            })
          }>
          {/* 연필 아이콘 */}
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
