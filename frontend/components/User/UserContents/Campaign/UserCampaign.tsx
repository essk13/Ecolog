import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
// Api & Types
import {UserPostList} from '../../../../api/user';
// Components
import UserCampaignItem from './UserCampaignItem';

const styles = () =>
  StyleSheet.create({
    scrollContainer: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: 2,
    },
    itemContainer: {
      width: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  });

interface UserCampaignProps {
  postList: UserPostList;
}

function UserCampaign({postList}: UserCampaignProps) {
  const items = postList.map((userPost, index) => (
    <UserCampaignItem key={index} userPost={userPost} />
  ));

  return (
    <ScrollView style={styles().scrollContainer}>
      <View style={styles().itemContainer}>{items}</View>
    </ScrollView>
  );
}

export default UserCampaign;
