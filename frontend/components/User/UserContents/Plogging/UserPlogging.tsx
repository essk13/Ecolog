import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
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

const PloggingData = [
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
  'User Ploggin Data',
];

function UserPlogging() {
  const items = PloggingData.map((data, index) => (
    <UserPloggingItem key={index} data={data} num={index + 1} />
  ));

  return (
    <ScrollView style={styles().scrollContainer}>
      <View style={styles().itemContainer}>{items}</View>
    </ScrollView>
  );
}

export default UserPlogging;
