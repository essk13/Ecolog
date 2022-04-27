import React from 'react';
import {View, StyleSheet} from 'react-native';
// Components
import UserPloggingItem from './UserPlogginItem';

const styles = () =>
  StyleSheet.create({
    itemContainer: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      paddingBottom: 230,
    },
  });

function UserPlogging() {
  return (
    <View style={styles().itemContainer}>
      <UserPloggingItem />
      <UserPloggingItem />
      <UserPloggingItem />
      <UserPloggingItem />
      <UserPloggingItem />
    </View>
  );
}

export default UserPlogging;
