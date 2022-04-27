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

function UserAvatar() {
  return (
    <ScrollView style={styles().contentContainer}>
      <Text>This is Avatar Data</Text>
    </ScrollView>
  );
}

export default UserAvatar;
