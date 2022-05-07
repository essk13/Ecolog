import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {getUserPost} from '../../../../api/user';
import {RootState} from '../../../../modules';
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

function UserCampaign() {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const {data: userPostList, isLoading} = useQuery(
    ['userPostList', myInfo.data?.no],
    () => getUserPost(myInfo.data ? myInfo.data?.no : 0),
  );

  if (!userPostList || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }

  const items = userPostList.map((userPost, index) => (
    <UserCampaignItem key={index} userPost={userPost} />
  ));

  return (
    <ScrollView style={styles().scrollContainer}>
      <View style={styles().itemContainer}>{items}</View>
    </ScrollView>
  );
}

export default UserCampaign;
