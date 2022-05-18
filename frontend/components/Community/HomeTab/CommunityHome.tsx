import React, {useState} from 'react';
// Hooks
import {useMutation, useQueryClient, useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// Api & Types
import {CommunityDetail} from '../../../api/community';
import {
  postCommunityJoin,
  deleteCommunityJoin,
  deleteCommunity,
} from '../../../api/community';
import {getCommunityMember} from '../../../api/community';
import {RootState} from '../../../modules';
// Components
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import IconF from 'react-native-vector-icons/FontAwesome5';
import {ActivityIndicator, Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  loadingContainer: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    height: '100%',
    padding: 10,
  },
  HomeNotice: {
    backgroundColor: '#6b6b6b',
    height: '15%',
    width: '100%',
    padding: 10,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#dfdfdf',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: '#868686',
    borderRadius: 5,
  },
  // 그림자 효과
  intro: {
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  // 그림자 효과
  commuInfo: {
    width: '100%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '20%',
  },
  editButton: {
    marginLeft: 'auto',
    marginRight: 3,
    color: '#992f2f',
  },
  editContainer: {
    flexDirection: 'row',
  },
  joinButton: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(95, 162, 229, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#868686',
    borderRadius: 5,
    marginBottom: 20,
  },
  userContainer: {
    width: '100%',
    height: '40%',
  },
  joinText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuTitle: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  infoText: {
    color: '#6b6b6b',
    fontSize: 14,
  },
});

function UserItem({user}: any) {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Text style={{color: 'black'}}>{user.nickname}</Text>
    </View>
  );
}

interface CommunityDetailProps {
  data: CommunityDetail;
}

function CommunityHome({data}: CommunityDetailProps) {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const {data: communityMember, isLoading} = useQuery(
    ['CommunityMember', data.no],
    () => getCommunityMember(data.no),
  );

  const {mutate: communityJoin} = useMutation(postCommunityJoin, {
    onSuccess: () => {
      queryClient.invalidateQueries('CommunityDetail');
      queryClient.invalidateQueries('CommunityList');
      queryClient.invalidateQueries('myCommunity');
    },
  });
  const {mutate: communityDeleteJoin} = useMutation(deleteCommunityJoin, {
    onSuccess: () => {
      queryClient.invalidateQueries('CommunityDetail');
      queryClient.invalidateQueries('CommunityList');
      queryClient.invalidateQueries('myCommunity');
      navigation.navigate('Community');
    },
  });
  const {mutate: communityDelete} = useMutation(deleteCommunity, {
    onSuccess: () => {
      queryClient.invalidateQueries('CommunityList');
      queryClient.invalidateQueries('myCommunity');
      navigation.navigate('Community');
    },
  });
  const myInfo = useSelector((state: RootState) => state.user.user);
  const Join = () => {
    communityJoin(data.no);
    Alert.alert('가입이 완료되었습니다.');
  };
  const deleteJoin = () => {
    communityDeleteJoin(data.no);
    Alert.alert('탈퇴가 완료되었습니다.');
  };
  const deleteCommu = () => {
    communityDelete(data.no);
    Alert.alert('삭제가 완료되었습니다.');
  };

  if (!communityMember || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
      </View>
    );
  }
  return (
    <View style={styles.Container}>
      {!data.join && (
        <TouchableOpacity onPress={() => Join()} style={styles.joinButton}>
          <Text style={styles.joinText}>가입하기</Text>
        </TouchableOpacity>
      )}
      <View style={styles.editContainer}>
        <Text style={styles.menuTitle}>커뮤니티 정보</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('CommunityEdit', {data: data})}>
          {data.manager.email === myInfo.data?.email && (
            <IconF name="edit" size={18} color={'#992f2f'} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.commuInfo}>
        <Text style={styles.infoText}>관리자 : {data.manager.nickname}</Text>
        <Text style={styles.infoText}>태그 : {data.tag}</Text>
        <Text style={styles.infoText}>활동 지역 : {data.sido} </Text>
      </View>
      <Text style={styles.menuTitle}>커뮤니티 소개</Text>
      <View style={styles.intro}>
        <Text style={styles.infoText}>{data.description}</Text>
      </View>
      <FlatList
        style={styles.userContainer}
        data={communityMember}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => <UserItem user={item} />}
        keyExtractor={item => item.no.toString()}
      />
      {data.join && data.manager.email !== myInfo.data?.email && (
        <TouchableOpacity onPress={() => deleteJoin()} style={styles.button}>
          <Text style={styles.menuTitle}>탈퇴하기</Text>
        </TouchableOpacity>
      )}
      {data.manager.email === myInfo.data?.email && (
        <TouchableOpacity onPress={() => deleteCommu()} style={styles.button}>
          <Text style={styles.menuTitle}>삭제하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CommunityHome;
