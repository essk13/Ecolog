import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
// Components
import UserInfoText from './UserInfoText';

const styles = (direction?: any, padding?: number) =>
  StyleSheet.create({
    userContainer: {
      flexDirection: direction || 'column',
      padding: padding || 0,
      paddingBottom: 10,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      width: '100%',
    },
    profileImg: {
      width: 120,
      height: 120,
      borderRadius: 10,
    },
    btn: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 35,
    },
    line: {
      width: 1,
      height: 20,
      backgroundColor: '#FFFFFF',
    },
  });

const fontStyles = (size?: number, weight?: any) =>
  StyleSheet.create({
    userName: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      marginLeft: 25,
      marginBottom: 10,
      color: '#FFFFFF',
    },
    buttonText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: '#FFFFFF',
    },
  });

interface User {
  name: string;
  content: number;
  follow: number;
  follower: number;
}

interface UserInfoProps {
  user: User;
}

function UserInfo({user}: UserInfoProps) {
  return (
    <View>
      <View style={styles('row', 20).userContainer}>
        <Image
          style={styles().profileImg}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
          }}
        />
        <View>
          <Text style={fontStyles(20, '600').userName}>{user.name}</Text>
          <View style={styles('row').userContainer}>
            <UserInfoText title={'내 게시물'} count={user.content} />
            <UserInfoText title={'팔로우'} count={user.follow} />
            <UserInfoText title={'팔로워'} count={user.follower} />
          </View>
        </View>
      </View>

      {/* <View style={styles().btnContainer}>
        <TouchableOpacity onPress={() => {}} style={styles().btn}>
          <Text style={fontStyles(20, '600').buttonText}>플로깅</Text>
        </TouchableOpacity>
        <View style={styles().line} />
        <TouchableOpacity onPress={() => {}} style={styles().btn}>
          <Text style={fontStyles(20, '600').buttonText}>캠페인</Text>
        </TouchableOpacity>
        <View style={styles().line} />
        <TouchableOpacity onPress={() => {}} style={styles().btn}>
          <Text style={fontStyles(20, '600').buttonText}>아바타</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default UserInfo;
