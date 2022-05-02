import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flexGrow: 0,
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
  },
});

function CommunityNotice() {
  return (
    <View style={styles.Container}>
      <Text>Notice</Text>
    </View>
  );
}

export default CommunityNotice;
