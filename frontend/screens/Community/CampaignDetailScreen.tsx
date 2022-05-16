import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
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
  },

  imageContainer: {
    height: '40%',
    width: '100%',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    overflow: 'hidden',
    alignItems: 'flex-end',
  },
  img: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#d10909',
    top: '35%',
    width: '20%',
    height: '10%',
    borderRadius: 35,
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
    paddingTop: '20%',
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
      <View style={styles.imageContainer}>
        <ImageBackground source={{uri: data.image}} style={styles.img}>
          <Text style={styles.title}>{data.title}</Text>
        </ImageBackground>
      </View>
      <TouchableOpacity onPress={() => Join()} style={styles.button}>
        <Text>참가하기</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
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
    </View>
  );
}

export default CampaignDetailScreen;
