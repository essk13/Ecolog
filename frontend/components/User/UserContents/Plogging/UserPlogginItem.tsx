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

interface Props {
  data: string;
  num: number;
}

function UserPloggingItem({data, num}: Props) {
  return (
    <View style={styles().itemContainer}>
      <Text>
        {data} {num}
      </Text>
    </View>
  );
}

export default UserPloggingItem;
