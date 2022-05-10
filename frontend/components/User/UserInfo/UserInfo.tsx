import React from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Hooks
import {userActions} from '../../../modules/user';
import {useMutation, useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
// Api & Types
import {logout} from '../../../api/auth';
import {User, userFollow, UserProfile} from '../../../api/user';
import {RootStackNavigationProp} from '../../../screens/types';
import {RootState} from '../../../modules';
// Components
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import UserInfoText from './UserInfoText';
import {ActivityIndicator, Colors} from 'react-native-paper';

const styles = (direction?: any, padding?: number, paddingBottom?: number) =>
  StyleSheet.create({
    loadingContainer: {
      width: '100%',
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userContainer: {
      flexDirection: direction || 'column',
      padding: padding || 0,
      paddingBottom: paddingBottom || 5,
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    profileImg: {
      width: 120,
      height: 120,
      borderRadius: 10,
    },
    userInfoContainer: {
      height: 120,
      flexGrow: 1,
      marginLeft: 25,
      marginRight: 10,
    },
    followingButton: {
      flexDirection: 'row',
      width: '100%',
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#4e5fff',
    },
    followButton: {
      flexDirection: 'row',
      width: '100%',
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ffffff',
    },
  });

const fontStyles = (size?: number, weight?: any, color?: string) =>
  StyleSheet.create({
    userName: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      marginBottom: 8,
      color: color || '#FFFFFF',
    },
    buttonText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#FFFFFF',
      marginLeft: 5,
    },
  });

interface UserInfoProps {
  user: User | UserProfile;
  userIsLoading: boolean;
  postCount: Number;
}

function UserInfo({user, userIsLoading, postCount}: UserInfoProps) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch = useDispatch();
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
      dispatch(userActions.getMyInfoAsync.request(null));
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
      <View style={styles('row', 20, 10).userContainer}>
        <Image
          style={styles().profileImg}
          source={{
            uri: user?.image,
          }}
        />
        <View style={styles().userInfoContainer}>
          <Text style={fontStyles(20, '600').userName}>
            {user ? user.name : null}
          </Text>
          <View style={styles('row', 0, 5).userContainer}>
            <UserInfoText title={'게시물'} count={postCount} />
            <TouchableOpacity
              onPress={() =>
                navigation.push('UserFollow', {userId: user.no, index: 0})
              }>
              <UserInfoText
                title={'팔로워'}
                count={user?.follower_user.length}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.push('UserFollow', {userId: user.no, index: 1})
              }>
              <UserInfoText
                title={'팔로잉'}
                count={user?.following_user.length}
              />
            </TouchableOpacity>
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
            <>
              {(follow.isLoading || userIsLoading) && (
                <View style={styles().loadingContainer}>
                  <ActivityIndicator animating={true} color={Colors.white} />
                </View>
              )}
              {!follow.isLoading &&
                !userIsLoading &&
                user.follower_user
                  .map(follower => follower.no)
                  .includes(myInfo.data.no) && (
                  <TouchableOpacity
                    style={styles().followingButton}
                    onPress={() => follow.mutate(user.no)}>
                    <Icon name="user-following" size={16} color="#ffffff" />
                    <Text style={fontStyles(14).buttonText}>팔로잉</Text>
                  </TouchableOpacity>
                )}
              {!follow.isLoading &&
                !userIsLoading &&
                !user.follower_user
                  .map(follower => follower.no)
                  .includes(myInfo.data.no) && (
                  <TouchableOpacity
                    style={styles().followButton}
                    onPress={() => follow.mutate(user.no)}>
                    <Icon name="user-follow" size={16} color="#ffffff" />
                    <Text
                      style={fontStyles(14, 'normal', '#ffffff').buttonText}>
                      팔로우
                    </Text>
                  </TouchableOpacity>
                )}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default UserInfo;
