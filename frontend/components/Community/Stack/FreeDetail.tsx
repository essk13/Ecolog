import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Post} from '../../../api/community';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  titleContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#c4c4c4',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  contentContainer: {
    width: '100%',
    flex: 4,
    borderColor: '#c4c4c4',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#7a7a7a',
  },
  contentText: {
    fontSize: 14,
    color: '#3a3a3a',
  },
  like: {
    fontSize: 14,
    color: '#3a3a3a',
    marginTop: 'auto',
  },
});
interface PostItemProps {
  post: Post;
}
function FreeDetail({post}: PostItemProps) {
  const date = post.created_at.split('T');
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>자유게시판</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{post.title}</Text>
        <Text style={styles.dateText}>
          {date[0]} {date[1]}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{post.content}</Text>
        <Text style={styles.like}>좋아요 {post.like_count}</Text>
      </View>
    </View>
  );
}

export default FreeDetail;
