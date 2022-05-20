import React from 'react';
// Hooks
import {UseMutateFunction, useQuery} from 'react-query';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useMutation, useQueryClient} from 'react-query';
// Api & Types
import {
  Campaign,
  Comment,
  CommentInfo,
  createCampaignComment,
  deleteCampaign,
  deleteCampaignComment,
  DeleteCommentData,
  editCampaignComment,
  getCampaignCommentList,
  getCampaignDetail,
  postCampaignJoin,
} from '../../api/community';
import {RootState} from '../../modules';
// Components
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderColor: '#c4c4c4',
    borderTopWidth: 1,
    marginLeft: 5,
    paddingVertical: 5,
  },
  imgBox: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#dddddd',
    marginTop: 'auto',
    margin: 10,
    borderRadius: 10,
    height: 60,
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
  },
  titleBox: {
    flex: 1,
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
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
  editContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: 96,
    flexDirection: 'row',
    marginBottom: 10,
  },
  locationContainer: {
    height: '100%',
    flex: 2,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'rgb(121, 190, 36)',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  countContainer: {
    height: '100%',
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'rgb(121, 190, 36)',
    justifyContent: 'flex-end',
    elevation: 3,
  },
  desContainer: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'rgb(62, 68, 75)',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    margin: 20,
    marginTop: 0,
    marginLeft: 0,
    alignSelf: 'flex-start',
    color: '#636363',
  },
  firstFont: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '700',
  },
  contentFont: {
    fontSize: 14,
    color: '#ffffff',
  },
  buttonText: {
    fontSize: 16,
    color: '#202020',
    fontWeight: '600',
    letterSpacing: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 10,
  },
  editText: {
    fontSize: 14,
    color: '#000000',
  },
  deleteText: {
    fontSize: 14,
    color: '#ff0000',
  },
  personImg: {
    position: 'absolute',
    top: 10,
    right: -40,
    width: 160,
    height: 160,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    color: '#000000',
    padding: 0,
    paddingLeft: 10,
    flex: 6,
  },
  submit: {
    flex: 1,
    maxHeight: 30,
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
  commentEditText: {
    color: '#000000',
    marginTop: 3,
    marginLeft: 8,
  },
});

interface CommentProps {
  data: Campaign;
  commentItem: Comment;
  commentDelete: UseMutateFunction<any, unknown, DeleteCommentData, unknown>;
}

const PromListItem = ({commentItem, commentDelete}: CommentProps) => {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const [editCommentStart, setEditCommentStart] =
    React.useState<boolean>(false);
  const [prevComment, setPrevComment] = React.useState<CommentInfo>({
    content: commentItem.content,
  });
  const {mutate: editComment} = useMutation(editCampaignComment, {
    onSuccess: () => {
      Alert.alert('수정이 완료되었습니다.');
      queryClient.invalidateQueries([
        'campaignDetail',
        {no: route.params.no, id: route.params.id},
      ]);
      queryClient.invalidateQueries([
        'campaignCommentList',
        {no: route.params.no, postNo: route.params.id},
      ]);
    },
  });
  const deleteCo = () => {
    commentDelete({
      communityNo: route.params.no,
      postNo: route.params.id,
      commentNo: commentItem.no,
    });
  };
  const editCommentSubmit = () => {
    editComment({
      community: route.params.no,
      post: route.params.id,
      commentNo: commentItem.no,
      commentInfo: prevComment,
    });
    setEditCommentStart(false);
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
              <Text style={styles.commentEditText}>수정</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

function CampaignDetailScreen({route}: any) {
  const queryClient = useQueryClient();
  const {mutate: campaignJoin} = useMutation(postCampaignJoin, {
    onSuccess: () => {
      queryClient.invalidateQueries(['campaignList', route.params.no]);
      queryClient.invalidateQueries([
        'campaignDetail',
        {no: route.params.no, id: route.params.id},
      ]);
    },
  });
  const Join = () => {
    campaignJoin({communityNo: route.params.no, campaignNo: route.params.id});
  };
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<any>();
  const {mutate: campaignDelete} = useMutation(deleteCampaign, {
    onSuccess: () => {
      Alert.alert('삭제가 완료되었습니다.');
      queryClient.invalidateQueries(['campaignList', route.params.no]);
      navigation.pop();
    },
  });
  const {data: data, isLoading} = useQuery(
    ['campaignDetail', {no: route.params.no, id: route.params.id}],
    () => getCampaignDetail(route.params.no, route.params.id),
  );
  const [comment, setComment] = React.useState<CommentInfo>({content: ''});
  const {data: commentListData} = useQuery(
    ['campaignCommentList', {no: route.params.no, postNo: route.params.id}],
    () =>
      getCampaignCommentList({no: route.params.no, postNo: route.params.id}),
  );
  const {mutate: createComment} = useMutation(createCampaignComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        'campaignDetail',
        {no: route.params.no, id: route.params.id},
      ]);
      queryClient.invalidateQueries([
        'campaignCommentList',
        {no: route.params.no, postNo: route.params.id},
      ]);
    },
  });
  const {mutate: commentDelete} = useMutation(deleteCampaignComment, {
    onSuccess: () => {
      Alert.alert('삭제가 완료되었습니다.');
      queryClient.invalidateQueries([
        'campaignDetail',
        {no: route.params.no, id: route.params.id},
      ]);
      queryClient.invalidateQueries([
        'campaignCommentList',
        {no: route.params.no, postNo: route.params.id},
      ]);
    },
  });

  const submit = () => {
    createComment({
      community: route.params.no,
      post: route.params.id,
      commentInfo: comment,
    });
    setComment({content: ''});
  };

  if (!myInfo.data || !data || isLoading || !commentListData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
      </View>
    );
  }

  const nowPeople = data.join_personnel.length;
  const deleteCam = () => {
    campaignDelete({
      communitySeq: route.params.no,
      campaignSeq: route.params.id,
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text style={styles.mainTitle}>캠페인</Text>
          <View style={styles.titleContainer}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{data.title}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.writerBox}
              onPress={() =>
                navigation.navigate('UserProfile', {id: data.writer.no})
              }>
              <View style={styles.writerImgBox}>
                <Image
                  style={styles.writerImg}
                  source={{uri: data.writer.image}}
                />
              </View>
              <Text style={styles.writerName}>{data.writer.nickname}</Text>
            </TouchableOpacity>
          </View>
          {data.writer.email === myInfo.data.email && (
            <View style={styles.editContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('CampaignEdit', {
                    data: data,
                    no: route.params.no,
                  })
                }>
                <Icon name="edit" size={18} color={'#000000'} />
                <Text style={styles.editText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.editButton}
                onPress={() => deleteCam()}>
                <Icon name="delete" size={18} color={'#ff0000'} />
                <Text style={styles.deleteText}>삭제</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.imgBox}>
            <Image source={{uri: data.image}} style={styles.img} />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.locationContainer}>
              <View>
                <Text style={styles.firstFont}>장소</Text>
                <Text style={styles.firstFont}>{data.location}</Text>
              </View>
              <Image
                style={styles.personImg}
                source={require('../../assets/Community/person.png')}
              />
            </View>
            <View style={styles.countContainer}>
              <Text style={styles.firstFont}>인원</Text>
              <Text style={styles.firstFont}>
                {nowPeople} / {data.max_personnel}
              </Text>
            </View>
          </View>
          <View style={styles.desContainer}>
            <Text style={styles.contentFont}>{data.content}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="댓글을 입력해 주세요."
              value={comment.content}
              onChangeText={(text: string) => setComment({content: text})}
              returnKeyType="done"
              clearTextOnFocus={true}
              style={styles.textInput}
              multiline
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
        </View>
      </ScrollView>
      {data.writer.email !== myInfo.data.email && (
        <TouchableOpacity onPress={() => Join()} style={styles.button}>
          {data.joining && <Text style={styles.buttonText}>참가 취소하기</Text>}
          {!data.joining && <Text style={styles.buttonText}>참가하기</Text>}
        </TouchableOpacity>
      )}
    </>
  );
}

export default CampaignDetailScreen;
