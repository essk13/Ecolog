import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {CommunityDetail} from '../../../api/community';
import {Button} from 'react-native-paper';
import {useMutation} from 'react-query';
import {
  postCommunityJoin,
  deleteCommunityJoin,
  deleteCommunity,
} from '../../../api/community';
import {useSelector} from 'react-redux';
import {RootState} from '../../../modules';
import {useNavigation} from '@react-navigation/native';
const styles = StyleSheet.create({
  Container: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    height: '100%',
    padding: 10,
    paddingTop: 30,
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
    borderWidth: 1,
    borderColor: '#868686',
    padding: 10,
    borderRadius: 10,
  },
  // 그림자 효과
  commuInfo: {
    width: '100%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#868686',
    marginBottom: 30,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '20%',
  },
  editButton: {
    marginLeft: 'auto',
    color: '#992f2f',
  },
  editContainer: {
    flexDirection: 'row',
  },
  joinButton: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#70d81b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#868686',
    borderRadius: 5,
    marginBottom: 20,
  },
  joinText: {
    color: '#ffffff',
  },
});
interface CommunityDetailProps {
  data: CommunityDetail;
}
function CommunityHome({data}: CommunityDetailProps) {
  console.log(data.join);
  const navigation = useNavigation<any>();
  const {mutate: communityJoin} = useMutation(postCommunityJoin);
  const {mutate: communityDeleteJoin} = useMutation(deleteCommunityJoin);
  const {mutate: communityDelete} = useMutation(deleteCommunity);
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

  return (
    <View style={styles.Container}>
      {!data.join && (
        <TouchableOpacity onPress={() => Join()} style={styles.joinButton}>
          <Text style={styles.joinText}>가입하기</Text>
        </TouchableOpacity>
      )}
      <View style={styles.editContainer}>
        <Text>커뮤니티 정보</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('CommunityEdit', {data: data})}>
          {data.manager.email === myInfo.data?.email && (
            // 연필 아이콘
            <Text style={styles.editButton}>수정</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.commuInfo}>
        <Text>회원 수 </Text>
        <Text>개설일</Text>
        <Text>관리자 : {data.manager.email}</Text>
        <Text>캠페인 태그 : {data.tag}</Text>
        <Text>지역 </Text>
      </View>
      <Text>커뮤니티 소개</Text>
      <View style={styles.intro}>
        <Text>{data.description}</Text>
      </View>
      {data.join && data.manager.email !== myInfo.data?.email && (
        <TouchableOpacity onPress={() => deleteJoin()} style={styles.button}>
          <Text>탈퇴하기</Text>
        </TouchableOpacity>
      )}
      {data.manager.email === myInfo.data?.email && (
        <TouchableOpacity onPress={() => deleteCommu()} style={styles.button}>
          <Text>삭제하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CommunityHome;
