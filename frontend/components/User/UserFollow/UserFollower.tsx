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

interface UserFollowerProps {
  followerUserList: FollowUserList | undefined;
}

function UserFollower({followerUserList}: UserFollowerProps) {
  return (
    <FlatList
      style={styles().scrollContainer}
      data={followerUserList}
      renderItem={({item}: any) => <UserFollowItem followUser={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default UserFollower;
