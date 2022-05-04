import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../../../screens/types';
import {Plogging} from '../../../../api/plogging';

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

interface UserPloggingItemProps {
  ploggingData: Plogging;
}

function UserPloggingItem({ploggingData}: UserPloggingItemProps) {
  const navigation = useNavigation<MainTabNavigationProp>();

  return (
    <TouchableOpacity
      style={styles().itemContainer}
      onPress={() =>
        navigation.navigate('PloggingRecord', {id: ploggingData.no})
      }>
      <Text>{ploggingData.no}</Text>
    </TouchableOpacity>
  );
}

export default UserPloggingItem;
