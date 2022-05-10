import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
// Api & Types
import {PloggingList} from '../../../../api/plogging';
// Components
import UserPloggingItem from './UserPlogginItem';

const styles = () =>
  StyleSheet.create({
    scrollContainer: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
    },
    itemContainer: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      paddingBottom: 25,
    },
  });

interface UserPloggingProps {
  ploggingList: PloggingList;
}

function UserPlogging({ploggingList}: UserPloggingProps) {
  const items = [...ploggingList]
    .reverse()
    .map((ploggingData, index) => (
      <UserPloggingItem key={index} ploggingData={ploggingData} />
    ));

  return (
    <ScrollView style={styles().scrollContainer}>
      <View style={styles().itemContainer}>{items}</View>
    </ScrollView>
  );
}

export default UserPlogging;
