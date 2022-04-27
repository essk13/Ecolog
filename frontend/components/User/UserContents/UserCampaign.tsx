import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    contentContainer: {
      width: '100%',
      minHeight: '80%',
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
  });

function UserCampaign() {
  return (
    <ScrollView style={styles().contentContainer}>
      <Text>This is Campaign Data</Text>
    </ScrollView>
  );
}

export default UserCampaign;
