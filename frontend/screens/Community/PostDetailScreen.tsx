import React from 'react';
// Hooks
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from 'react-query';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
// Api & Types
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
  DeleteCommentData,
  Post,
} from '../../api/community';
import {RootState} from '../../modules';
// Components
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import NoticeDetail from '../../components/Community/Stack/NoticeDetail';
import FreeDetail from '../../components/Community/Stack/FreeDetail';
import CampaignDetail from '../../components/Community/Stack/CampaignDetail';
import {ActivityIndicator, Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    paddingTop: 15,
    paddingBottom: 5,
    marginLeft: 10,
  },
  commentImgBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    elevation: 5,
  },
  commentImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentTextContanier: {
    flex: 1,
    paddingRight: 20,
  },
  commentWriterBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentWriter: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    marginRight: 4,
  },
  commentIcon: {
    marginLeft: 2,
  },
  commentContent: {
    fontSize: 14,
    color: '#000000',
  },
  textEditInput: {
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    color: '#000000',
    padding: 0,
    paddingLeft: 10,
    marginTop: 5,
    flex: 6,
  },
  editText: {
    color: '#000000',
    marginTop: 3,
    marginLeft: 8,
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
  editPostContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  editPostIcon: {
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
  data: Post;
  commentItem: Comment;
  commentDelete: UseMutateFunction<any, unknown, DeleteCommentData, unknown>;
}

const PromListItem = ({data, commentItem, commentDelete}: CommentProps) => {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.commentImgBox}
        onPress={() =>
          navigation.navigate('UserProfile', {id: commentItem.writer.no})
        }>
        <Image
          style={styles.commentImg}
          source={{uri: commentItem.writer.image}}
        />
      </TouchableOpacity>
      <View style={styles.commentTextContanier}>
        <View style={styles.commentWriterBox}>
          <Text style={styles.commentWriter}>
            {commentItem.writer.nickname}
          </Text>
          {commentItem.writer.email === myInfo.data?.email &&
            !editCommentStart && (
              <>
                <TouchableOpacity
                  style={styles.commentIcon}
                  onPress={() => setEditCommentStart(true)}>
                  <Icon name="edit" size={14} color={'#ABABAB'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.commentIcon}
                  onPress={() => deleteCo()}>
                  <Icon name="delete" size={14} color={'#ABABAB'} />
                </TouchableOpacity>
              </>
            )}
        </View>
        {!editCommentStart && (
          <Text style={styles.commentContent}>{commentItem.content}</Text>
        )}
        {commentItem.writer.email === myInfo.data?.email && editCommentStart && (
          <View>
            <TextInput
              placeholder="댓글을 입력해 주세요."
              value={prevComment.content}
              onChangeText={(text: string) => setPrevComment({content: text})}
              returnKeyType="done"
              style={styles.textEditInput}
              multiline
              autoFocus
            />
            <TouchableOpacity onPress={() => editCommentSubmit()}>
              <Text style={styles.editText}>수정</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

function PostDetailScreen({route}: any) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const [comment, setComment] = React.useState<CommentInfo>({content: ''});
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
  const {data: data, isLoading} = useQuery(
    ['postDetail', {no: route.params.no, id: route.params.id}],
    () => getPostDetail(route.params.no, route.params.id),
  );
  const {data: commentListData, isLoading: isLoadingComment} = useQuery(
    ['commentList', {no: route.params.no, postNo: route.params.id}],
    () => getCommentList({no: route.params.no, postNo: route.params.id}),
  );

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
    setComment({content: ''});
  };
  const deletePo = () => {
    postDelete({
      communitySeq: route.params.no,
      postSeq: route.params.id,
    });
    Alert.alert('삭제가 완료되었습니다.');
  };

  if (!data || isLoading || !commentListData || isLoadingComment) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {route.params.type === 1 && <NoticeDetail post={data} like={like} />}
        {route.params.type === 2 && <FreeDetail post={data} like={like} />}
        {route.params.type === 3 && <CampaignDetail post={data} like={like} />}
        {data.writer.email === myInfo.data?.email && (
          <View style={styles.editPostContainer}>
            <TouchableOpacity
              style={styles.editPostIcon}
              onPress={() =>
                navigation.navigate('PostEdit', {
                  data: data,
                  no: route.params.no,
                  type: route.params.type,
                })
              }>
              <Icon name="edit" size={18} color={'#ABABAB'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editPostIcon}
              onPress={() => deletePo()}>
              <Icon name="delete" size={18} color={'#ABABAB'} />
            </TouchableOpacity>
          </View>
        )}
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
        <View style={styles.comment}>
          {commentListData.map(item => (
            <PromListItem
              key={item.no}
              data={data}
              commentItem={item}
              commentDelete={commentDelete}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default PostDetailScreen;
