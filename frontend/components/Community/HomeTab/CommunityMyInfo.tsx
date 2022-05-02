import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    minHeight: '100%',
  },
});

function CommunityMyInfo() {
  return (
    <View style={styles.Container}>
      <Text>My Info</Text>
    </View>
  );
}

export default CommunityMyInfo;
