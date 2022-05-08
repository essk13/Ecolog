import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FA2E5',
  },
});

function PostEditScreen() {
  return (
    <View style={styles.container}>
      <Text>게시글 수정</Text>
    </View>
  );
}

export default PostEditScreen;
