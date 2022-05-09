import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import {useQuery} from 'react-query';
import {
  deletePost,
  getPostDetail,
  getCommentList,
  CommentInfo,
  createComment,
  Comment,
  deleteComment,
  editComment,
  likePost,
} from '../../api/community';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {useMutation} from 'react-query';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  image: {
    height: '30%',
    width: '50%',
  },
  comment: {
    flexGrow: 0,
    minHeight: '10%',
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
  },
});
interface CommentProps {
  commentItem: Comment;
}
function PostDetailScreen({route}: any) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<any>();
  const {mutate: postDelete} = useMutation(deletePost);
  const {mutate: commentDelete} = useMutation(deleteComment);
  const [comment, setComment] = React.useState<CommentInfo>({content: ''});
  const {mutate: createCom} = useMutation(createComment);
  const {mutate: postLike} = useMutation(likePost);
  const like = () => {
    postLike({
      community: route.params.no,
      post: route.params.id,
    });
  };
  const submit = () => {
    createCom({
      community: route.params.no,
      post: route.params.id,
      commentInfo: comment,
    });
    Alert.alert('생성이 완료되었습니다.');
  };
  const {data: data, isLoading} = useQuery(
    ['postDetail', route.params.no, route.params.id],
    () => getPostDetail(route.params.no, route.params.id),
  );
  const {data: commentListData, isLoadingComment} = useQuery(
    ['commentList', {no: route.params.no, postNo: route.params.id}],
    () => getCommentList({no: route.params.no, postNo: route.params.id}),
  );

  if (!data || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
  if (!commentListData || isLoadingComment) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
  const PromListItem = ({commentItem}: CommentProps) => {
    const [prevComment, setPrevComment] = React.useState<CommentInfo>({
      content: commentItem.content,
    });
    const {mutate: editCo} = useMutation(editComment);
    const deleteCo = () => {
      commentDelete({
        communityNo: route.params.no,
        postNo: route.params.id,
        commentNo: commentItem.no,
      });
      Alert.alert('삭제가 완료되었습니다.');
    };
    const editCommentSubmit = () => {
      editCo({
        community: route.params.no,
        post: route.params.id,
        commentNo: commentItem.no,
        commentInfo: prevComment,
      });
      Alert.alert('수정이 완료되었습니다.');
    };
    return (
      <View>
        <Text>{commentItem.content}</Text>
        <Text>{commentItem.no}</Text>
        <Text>{commentItem.writer.email}</Text>
        {data.writer.email === myInfo.data?.email && (
          <View>
            <TextInput
              placeholder="수정"
              value={prevComment.content}
              onChangeText={(text: string) => setPrevComment({content: text})}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={() => editCommentSubmit()}>
              <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteCo()}>
              <Text>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const deletePo = () => {
    postDelete({
      communitySeq: route.params.no,
      postSeq: route.params.id,
    });
    Alert.alert('삭제가 완료되었습니다.');
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: data.image}} style={styles.image} />
      <Text>{data.title}</Text>
      <Text>{data.content}</Text>
      <Text>커뮤니티 {route.params.no}</Text>
      <Text>캠페인 {route.params.id}</Text>
      <Text>{data.like_count}</Text>
      <TouchableOpacity onPress={() => like()}>
        <Text>좋아요</Text>
      </TouchableOpacity>
      {data.writer.email === myInfo.data?.email && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PostEdit', {
              data: data,
              no: route.params.no,
              type: route.params.type,
            })
          }>
          <Text>수정</Text>
        </TouchableOpacity>
      )}
      {data.writer.email === myInfo.data?.email && (
        <TouchableOpacity onPress={() => deletePo()}>
          <Text>삭제</Text>
        </TouchableOpacity>
      )}
      <FlatList
        style={styles.comment}
        data={commentListData}
        renderItem={({item}: any) => <PromListItem commentItem={item} />}
      />
      <TextInput
        placeholder="댓글"
        value={comment.content}
        onChangeText={(text: string) => setComment({content: text})}
        returnKeyType="done"
      />
      <TouchableOpacity onPress={() => submit()}>
        <Text>댓글 쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PostDetailScreen;
