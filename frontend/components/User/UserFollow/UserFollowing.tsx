import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {FollowUserList} from '../../../api/user';
// Components
import UserFollowItem from './UserFollowItem';

const styles = () =>
  StyleSheet.create({
    scrollContainer: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: '5%',
    },
  });

interface UserFollowingProps {
  followingUserList: FollowUserList | undefined;
}

function UserFollowing({followingUserList}: UserFollowingProps) {
  return (
    <FlatList
      style={styles().scrollContainer}
      data={followingUserList}
      renderItem={({item}: any) => <UserFollowItem followUser={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default UserFollowing;
