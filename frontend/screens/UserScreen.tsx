import React from 'react';
import {View, StyleSheet} from 'react-native';
// Components
import UserInfo from '../components/User/UserInfo/UserInfo';
import UserTabScreen from '../components/User/UserContents/UserTabScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../modules';

const styles = (color?: any) =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: color,
    },
  });

function UserScreen({navigation}: any) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const ploggingList = useSelector(
    (state: RootState) => state.plogging.ploggingList,
  );

  return (
    <View style={styles('#5FA2E5').background}>
      <UserInfo user={myInfo.data} navigation={navigation} />
      <UserTabScreen ploggingList={ploggingList.data} />
    </View>
  );
}

export default UserScreen;
