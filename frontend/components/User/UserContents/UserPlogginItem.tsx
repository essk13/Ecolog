import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    itemContainer: {
      width: '90%',
      height: 100,
      marginTop: 25,
      padding: 10,
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 0.5,
    },
  });

function UserPloggingItem() {
  return (
    <View style={styles().itemContainer}>
      <Text>User Plogging Item</Text>
    </View>
  );
}

export default UserPloggingItem;
