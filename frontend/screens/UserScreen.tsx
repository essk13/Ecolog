import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../modules';
import {communityActions} from '../modules/community';
// Components
import UserInfo from '../components/User/UserInfo/UserInfo';
import UserTab from '../components/User/UserContents/UserTab';

const styles = (color?: any) =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: color,
    },
  });

function UserScreen() {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const ploggingList = useSelector(
    (state: RootState) => state.plogging.ploggingList,
  );
  const postList = useSelector((state: RootState) => state.community.postList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (myInfo.data) {
      dispatch(communityActions.getUserPostAsync.request(myInfo.data.no));
    }
  }, [dispatch, myInfo.data]);

  if (!myInfo.data || !postList) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }

  return (
    <View style={styles('#5FA2E5').background}>
      <UserInfo
        user={myInfo.data}
        userIsLoading={myInfo.loading}
        postCount={postList.data ? postList.data.length : 0}
      />
      <UserTab ploggingList={ploggingList.data} postList={postList.data} />
    </View>
  );
}

export default UserScreen;
