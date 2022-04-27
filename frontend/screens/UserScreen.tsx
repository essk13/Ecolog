import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
// Components
import UserInfo from '../components/User/UserInfo/UserInfo';
import UserPloggingItem from '../components/User/UserContents/UserPlogginItem';

const styles = (color?: any) =>
  StyleSheet.create({
    background: {
      backgroundColor: color,
    },
    scrollContainer: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    itemContainer: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      paddingBottom: 230,
    },
  });

const UserData = {
  name: 'Unkown',
  content: 13,
  follow: 13,
  follower: 13,
};

function UserScreen() {
  return (
    <View style={styles('#5FA2E5').background}>
      <UserInfo user={UserData} />
      <ScrollView style={styles().scrollContainer}>
        <View style={styles().itemContainer}>
          <UserPloggingItem />
          <UserPloggingItem />
          <UserPloggingItem />
          <UserPloggingItem />
          <UserPloggingItem />
        </View>
      </ScrollView>
    </View>
  );
}

export default UserScreen;
