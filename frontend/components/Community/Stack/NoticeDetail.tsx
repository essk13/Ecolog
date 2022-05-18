import React from 'react';
// Hooks
import {useNavigation} from '@react-navigation/native';
// Api & Types
import {Post} from '../../../api/community';
// Components
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '30%',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    borderColor: '#c4c4c4',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginLeft: 5,
    paddingVertical: 5,
  },
  titleBox: {
    height: '100%',
  },
  writerBox: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    marginRight: 10,
  },
  writerImgBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    elevation: 5,
    marginRight: 5,
  },
  writerImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  writerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
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
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#7a7a7a',
  },
  contentText: {
    fontSize: 16,
    color: '#3a3a3a',
    marginLeft: 5,
    marginBottom: 5,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 5,
  },
  like: {
    fontSize: 14,
    color: '#3a3a3a',
    marginLeft: 3,
  },
});

interface PostItemProps {
  post: Post;
  like: () => void;
}

function NoticeDetail({post, like}: PostItemProps) {
  const date = post.created_at.split('T');
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>공지사항</Text>
      <View style={styles.titleContainer}>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{post.title}</Text>
          <Text style={styles.dateText}>
            {date[0]} {date[1]}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.writerBox}
          onPress={() =>
            navigation.navigate('UserProfile', {id: post.writer.no})
          }>
          <View style={styles.writerImgBox}>
            <Image style={styles.writerImg} source={{uri: post.writer.image}} />
          </View>
          <Text style={styles.writerName}>{post.writer.nickname}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{post.content}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.likeContainer}
          onPress={like}>
          <Icon
            name={post.liked ? 'heart' : 'heart-outline'}
            size={16}
            color={'red'}
          />
          <Text style={styles.like}>좋아요 {post.like_count}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NoticeDetail;
