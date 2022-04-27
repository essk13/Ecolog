import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
// Components
import UserCampaignItem from './UserCampaignItem';

const styles = () =>
  StyleSheet.create({
    scrollContainer: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
    },
    itemContainer: {
      width: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

function UserCampaign() {
  const items = new Array(13)
    .fill(null)
    .map((notUsed, index) => <UserCampaignItem key={index} notUse={notUsed} />);
  return (
    <ScrollView style={styles().scrollContainer}>
      <View style={styles().itemContainer}>{items}</View>
    </ScrollView>
  );
}

export default UserCampaign;
