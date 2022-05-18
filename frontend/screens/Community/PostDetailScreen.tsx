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
import {useMutation, useQueryClient} from 'react-query';
import NoticeDetail from '../../components/Community/Stack/NoticeDetail';
import FreeDetail from '../../components/Community/Stack/FreeDetail';
import CampaignDetail from '../../components/Community/Stack/CampaignDetail';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
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
  },
  commentContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  textInput: {
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    height: 30,
    color: '#000000',
    padding: 0,
    paddingLeft: 10,
    flex: 6,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  submit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#6e6e6e',
    borderWidth: 1,
    marginLeft: 10,
  },
  submitFont: {
    color: '#6e6e6e',
  },
});
interface CommentProps {
  commentItem: Comment;
}
function PostDetailScreen({route}: any) {
  console.log(route.params.type);
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const {mutate: postDelete} = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postList');
      navigation.pop();
    },
  });
  const {mutate: commentDelete} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('postDetail');
      queryClient.invalidateQueries('commentList');
    },
  });
  const [comment, setComment] = React.useState<CommentInfo>({content: ''});
  const {mutate: createCom} = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('postDetail');
      queryClient.invalidateQueries('commentList');
    },
  });
  const {mutate: postLike} = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postDetail');
    },
  });
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
    setComment('');
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
    const [editCommentStart, setEditCommentStart] =
      React.useState<boolean>(false);
    const [prevComment, setPrevComment] = React.useState<CommentInfo>({
      content: commentItem.content,
    });
    const {mutate: editCo} = useMutation(editComment, {
      onSuccess: () => {
        queryClient.invalidateQueries('postDetail');
        queryClient.invalidateQueries('commentList');
      },
    });
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
      setEditCommentStart(false);
      Alert.alert('수정이 완료되었습니다.');
    };
    return (
      <View style={styles.commentContainer}>
        <Text>{commentItem.writer.nickname}</Text>
        <Text>{commentItem.content}</Text>
        {data.writer.email === myInfo.data?.email && (
          <TouchableOpacity onPress={() => deleteCo()}>
            <Text>삭제</Text>
          </TouchableOpacity>
        )}
        {data.writer.email === myInfo.data?.email && (
          <TouchableOpacity onPress={() => setEditCommentStart(true)}>
            <Text>수정</Text>
          </TouchableOpacity>
        )}
        {data.writer.email === myInfo.data?.email && editCommentStart && (
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
  console.log(route.params.type);
  return (
    <View style={styles.container}>
      {route.params.type === 1 && <NoticeDetail post={data} />}
      {route.params.type === 2 && <FreeDetail post={data} />}
      {route.params.type === 3 && <CampaignDetail post={data} />}
      <TouchableOpacity onPress={() => like()}>
        <Text>좋아요</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="댓글을 입력해 주세요."
          value={comment.content}
          onChangeText={(text: string) => setComment({content: text})}
          returnKeyType="done"
          clearTextOnFocus={true}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.submit} onPress={() => submit()}>
          <Text style={styles.submitFont}>작성</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.comment}
        data={commentListData}
        renderItem={({item}: any) => <PromListItem commentItem={item} />}
      />
      {data.writer.email === myInfo.data?.email && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PostEdit', {
              data: data,
              no: route.params.no,
              type: route.params.type,
            })
          }>
          {/* 연필 아이콘 */}
          <Text>수정</Text>
        </TouchableOpacity>
      )}
      {data.writer.email === myInfo.data?.email && (
        <TouchableOpacity onPress={() => deletePo()}>
          <Text>삭제</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default PostDetailScreen;
