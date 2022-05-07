import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {logout} from '../../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';
import {User} from '../../../api/user';
// Components
import UserInfoText from './UserInfoText';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../screens/types';

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

interface UserInfoProps {
  user: User | null;
}

function UserInfo({user}: UserInfoProps) {
  const {mutate: userLogout, isLoading} = useMutation(logout, {
    onSuccess: () => {
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('persist:root');
    },
  });
  const navigation = useNavigation<RootStackNavigationProp>();

  function googleLogout() {
    auth().signOut();
    userLogout();
  }

  return (
    <View>
      <View style={styles('row', 20).userContainer}>
        <Image
          style={styles().profileImg}
          source={{
            uri: user?.image,
          }}
        />
        <View>
          <Text style={fontStyles(20, '600').userName}>
            {user ? user.name : null}
          </Text>
          <View style={styles('row').userContainer}>
            <UserInfoText title={'내 게시물'} count={13} />
            <UserInfoText title={'팔로우'} count={13} />
            <UserInfoText title={'팔로워'} count={13} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('UserEdit')}>
            <Text>내 정보 수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => googleLogout()}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default UserInfo;
