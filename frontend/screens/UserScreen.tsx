import React from 'react';
import {View, StyleSheet} from 'react-native';
// Components
import UserInfo from '../components/User/UserInfo/UserInfo';
import UserTab from '../components/User/UserContents/UserTabScreen';

const styles = (color?: any) =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: color,
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
      <UserTab />
    </View>
  );
}

export default UserScreen;
