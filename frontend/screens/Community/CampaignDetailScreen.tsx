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
import {useMutation, useQueryClient} from 'react-query';
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
    backgroundColor: '#dddddd',
    marginTop: 'auto',
    width: '100%',
    borderRadius: 10,
    height: '10%',
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
  },
  title: {
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
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'rgb(121, 190, 36)',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  countContainer: {
    height: '100%',
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'rgb(121, 190, 36)',
    justifyContent: 'flex-end',
    elevation: 3,
  },
  desContainer: {
    height: '15%',
    width: '100%',
    backgroundColor: 'rgb(62, 68, 75)',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 20,
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
  firstFont: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '700',
  },
  contentFont: {
    fontSize: 14,
    color: '#ffffff',
  },
  buttonText: {
    fontSize: 16,
    color: '#202020',
    fontWeight: '600',
    letterSpacing: 2,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#979797',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  personImg: {
    position: 'absolute',
    top: 10,
    right: -40,
    width: 160,
    height: 160,
  },
  editText: {
    color: '#000000',
  },
});

function CampaignDetailScreen({route}: any) {
  const queryClient = useQueryClient();
  const {mutate: campaignJoin} = useMutation(postCampaignJoin, {
    onSuccess: () => {
      queryClient.invalidateQueries('campaignDetail');
    },
  });
  const Join = () => {
    campaignJoin({communityNo: route.params.no, campaignNo: route.params.id});
  };
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<any>();
  const {mutate: campaignDelete} = useMutation(deleteCampaign, {
    onSuccess: () => {
      queryClient.invalidateQueries('campaignList');
      navigation.pop();
    },
  });
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
  const nowPeople = data.join_personnel.length;
  const deleteCam = () => {
    campaignDelete({
      communitySeq: route.params.no,
      campaignSeq: route.params.id,
    });
    Alert.alert('삭제가 완료되었습니다.');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginTop: 30,
          marginBottom: 20,
        }}>
        <View style={{marginRight: 'auto'}}>
          <Text style={styles.mainTitle}>{data.title}</Text>
        </View>
        {data.writer.email === myInfo.data?.email && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('CampaignEdit', {
                data: data,
                no: route.params.no,
              })
            }>
            <Text style={styles.editText}>수정</Text>
          </TouchableOpacity>
        )}
        {data.writer.email === myInfo.data?.email && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => deleteCam()}>
            <Text style={styles.editText}>삭제</Text>
          </TouchableOpacity>
        )}
      </View>
      <Image source={{uri: data.image}} style={styles.img} />
      <View style={styles.contentContainer}>
        <View style={styles.locationContainer}>
          <View>
            <Text style={styles.firstFont}>장소</Text>
            <Text style={styles.firstFont}>{data.location}</Text>
          </View>
          <Image
            style={styles.personImg}
            source={require('../../assets/Community/person.png')}
          />
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.firstFont}>인원</Text>
          <Text style={styles.firstFont}>
            {nowPeople} / {data.max_personnel}
          </Text>
        </View>
      </View>
      <View style={styles.desContainer}>
        <Text style={styles.contentFont}>{data.content}</Text>
      </View>
      <TouchableOpacity onPress={() => Join()} style={styles.button}>
        {data.joining && <Text style={styles.buttonText}>참가 취소하기</Text>}
        {!data.joining && <Text style={styles.buttonText}>참가하기</Text>}
      </TouchableOpacity>
    </View>
  );
}

export default CampaignDetailScreen;
