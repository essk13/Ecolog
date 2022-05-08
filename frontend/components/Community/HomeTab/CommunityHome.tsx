import React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
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
    backgroundColor: '#9c9c9c',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  intro: {
    height: '20%',
    backgroundColor: '#523636',
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
  commuInfo: {
    width: '100%',
    backgroundColor: '#9e7373',
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '10%',
  },
  editButton: {
    height: '10%',
  },
});
interface CommunityDetailProps {
  data: CommunityDetail;
}
function CommunityHome({data}: CommunityDetailProps) {
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
      <Image source={{uri: data.image}} style={styles.image} />
      {data.manager.email === myInfo.data?.email && (
        <Button
          onPress={() => navigation.navigate('CommunityEdit', {data: data})}
          style={styles.editButton}>
          <Text>수정하기</Text>
        </Button>
      )}
      <Text>공지 사항</Text>
      <View style={styles.HomeNotice}>
        <View>
          <Text>이것은 공지입니다</Text>
        </View>
        <View>
          <Text>이것은 공지입니다</Text>
        </View>
        <View>
          <Text>이것은 공지입니다</Text>
        </View>
        <View>
          <Text>이것은 공지입니다</Text>
        </View>
      </View>
      <Text>커뮤니티 정보</Text>
      <View style={styles.commuInfo}>
        <Text>회원 수 </Text>
        <Text>개설일</Text>
        <Text>관리자 : {data.manager.email}</Text>
        <Text>캠페인 태그 : {data.tag}</Text>
        <Text>지역 </Text>
      </View>
      <Text>소개글</Text>
      <View style={styles.intro}>
        <Text>{data.description}</Text>
      </View>
      {!data.join && (
        <Button onPress={() => Join()} style={styles.button}>
          <Text>가입하기</Text>
        </Button>
      )}
      {data.join && data.manager.email !== myInfo.data?.email && (
        <Button onPress={() => deleteJoin()} style={styles.button}>
          <Text>탈퇴하기</Text>
        </Button>
      )}
      {data.manager.email === myInfo.data?.email && (
        <Button onPress={() => deleteCommu()} style={styles.button}>
          <Text>삭제하기</Text>
        </Button>
      )}
    </View>
  );
}

export default CommunityHome;
