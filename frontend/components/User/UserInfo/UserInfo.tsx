import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import {RootState} from '../../../modules';
import {useNavigation} from '@react-navigation/native';
// Api & Types
import {logout} from '../../../api/auth';
import {User, userFollow, UserProfile} from '../../../api/user';
import {RootStackNavigationProp} from '../../../screens/types';
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

interface UserInfoProps {
  user: User | UserProfile | null;
  postCount: Number;
}

function UserInfo({user, postCount}: UserInfoProps) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<RootStackNavigationProp>();
  const queryClient = useQueryClient();
  const {mutate: userLogout} = useMutation(logout, {
    onSuccess: () => {
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('persist:root');
      auth().signOut();
    },
    onError: error => {
      console.error(error);
    },
  });
  const follow = useMutation(userFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', user?.no]);
    },
    onError: error => {
      console.error(error);
    },
  });

  function googleLogout() {
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
            <UserInfoText title={'게시물'} count={postCount} />
            <UserInfoText title={'팔로워'} count={user?.follower_user.length} />
            <UserInfoText
              title={'팔로우'}
              count={user?.following_user.length}
            />
          </View>
          {myInfo.data && user && myInfo.data.no === user.no && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('UserEdit')}>
                <Text>내 정보 수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => googleLogout()}>
                <Text>로그아웃</Text>
              </TouchableOpacity>
            </>
          )}
          {myInfo.data && user && myInfo.data.no !== user.no && (
            <TouchableOpacity onPress={() => follow.mutate(user.no)}>
              <Text>
                {user.follower_user
                  .map(follower => follower.no)
                  .includes(myInfo.data.no)
                  ? '팔로잉'
                  : '팔로우'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default UserInfo;
