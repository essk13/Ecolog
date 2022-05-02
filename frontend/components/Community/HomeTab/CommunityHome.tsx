import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    height: '100%',
  },
  HomeNotice: {
    backgroundColor: '#6b6b6b',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#9c9c9c',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  intro: {
    height: '30%',
    backgroundColor: '#523636',
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  commuInfo: {
    width: '90%',
    backgroundColor: '#9e7373',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

function CommunityHome() {
  return (
    <View style={styles.Container}>
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
        <Text>관리자</Text>
        <Text>캠페인 태그</Text>
        <Text>지역</Text>
      </View>
      <Text>소개글</Text>
      <View style={styles.intro}></View>
      <View style={styles.button}>
        <Text>가입하기</Text>
      </View>
    </View>
  );
}

export default CommunityHome;
