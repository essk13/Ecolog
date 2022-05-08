import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FA2E5',
  },
});

function PostCreateScreen() {
  return (
    <View style={styles.container}>
      <Text>게시글 생성</Text>
    </View>
  );
}

export default PostCreateScreen;
