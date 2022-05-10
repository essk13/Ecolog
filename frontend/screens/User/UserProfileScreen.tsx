import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useQuery} from 'react-query';
// Api & Types
import {getUserInfo, getUserPost} from '../../api/user';
import {getPloggingList} from '../../api/plogging';
import {RootStackParamList} from '../types';
// Components
import UserInfo from '../../components/User/UserInfo/UserInfo';
import UserTab from '../../components/User/UserContents/UserTab';

const styles = (color?: any) =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: color,
    },
  });

type UserProfileScreenRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

function UserProfileScreen() {
  const route = useRoute<UserProfileScreenRouteProp>();
  const userProfile = useQuery(['userProfile', route.params.id], () =>
    getUserInfo(route.params.id),
  );
  const userPloggingList = useQuery(['userPloggingList', route.params.id], () =>
    getPloggingList(route.params.id),
  );
  const userPostList = useQuery(['userPostList', route.params.id], () =>
    getUserPost(route.params.id),
  );

  if (!userProfile.data) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }

  return (
    <View style={styles('#5FA2E5').background}>
      <UserInfo
        user={userProfile.data}
        userIsLoading={userProfile.isFetching}
        postCount={userPostList.data ? userPostList.data.length : 0}
      />
      <UserTab
        ploggingList={userPloggingList.data}
        postList={userPostList.data}
      />
    </View>
  );
}

export default UserProfileScreen;
