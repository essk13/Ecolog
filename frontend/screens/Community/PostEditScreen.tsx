import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import {editPost, PostInfo} from '../../api/community';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import {
  CameraOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#4e4e4e',
    marginTop: 40,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#5FA2E5',
    marginTop: 'auto',
    width: '100%',
    borderRadius: 10,
    height: '10%',
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: 2,
  },
  menuTitle: {
    fontSize: 14,
    color: '#4e4e4e',
    marginBottom: 10,
    marginTop: 10,
  },
  secContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleInput: {
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    flex: 1,
    padding: 0,
    paddingLeft: 10,
    color: '#000000',
  },
  contentInput: {
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    flex: 3,
    marginBottom: 20,
    padding: 0,
    paddingLeft: 10,
    color: '#000000',
  },
  img: {
    flex: 1,
    backgroundColor: '#636363',
  },
  imageEdit: {
    flex: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageEditMask: {
    position: 'absolute',
    top: '70%',
    width: '100%',
    height: '30%',
    backgroundColor: '#000000',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function PostEditScreen({route}: any) {
  const [postInfo, setCampaignInfo] = React.useState<PostInfo>({
    title: '',
    open: false,
    content: '',
    type: route.params.type,
  });
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const [uri, setUri] = React.useState<string>('');
  React.useEffect(() => {
    if (route.params.data) {
      setCampaignInfo({
        ...postInfo,
        title: route.params.data.title,
        open: route.params.data.open,
        content: route.params.data.content,
      });
      setUri(route.params.data.image);
    }
  }, [route.params]);
  const {mutate: editPo} = useMutation(editPost, {
    onSuccess: data => {
      queryClient.invalidateQueries('postList');
      queryClient.invalidateQueries('postDetail');
      navigation.pop();
    },
  });
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    editPo({
      postImgData: communityImgData,
      postInfo: postInfo,
      no: route.params.no,
      postNo: route.params.data.no,
    });
    Alert.alert('수정이 완료되었습니다.');
  };
  const imagePickerOption: CameraOptions = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
  };
  const onPickImage = async (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      return;
    }
    if (res.assets && res.assets[0].uri) {
      setUri(res.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      {route.params.type === 1 && (
        <Text style={styles.title}>공지사항 수정</Text>
      )}
      {route.params.type === 2 && <Text style={styles.title}>게시글 수정</Text>}
      {route.params.type === 3 && (
        <Text style={styles.title}>인증 게시글 수정</Text>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.menuTitle}>제목</Text>
        {route.params.type === 3 && (
          <Text style={{color: '#acacac', marginLeft: 'auto'}}>
            게시글 전체 공개
          </Text>
        )}
        {route.params.type === 3 && (
          <Checkbox
            status={postInfo.open ? 'checked' : 'unchecked'}
            onPress={() => {
              setCampaignInfo({...postInfo, open: !postInfo.open});
            }}
          />
        )}
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력해주세요."
        value={postInfo.title}
        onChangeText={(text: string) =>
          setCampaignInfo({...postInfo, title: text})
        }
        returnKeyType="done"
      />
      {route.params.type !== 1 && <Text style={styles.menuTitle}>이미지</Text>}
      {route.params.type !== 1 && (
        <TouchableOpacity
          onPress={() => launchImageLibrary(imagePickerOption, onPickImage)}
          style={styles.imageEdit}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{
              uri: uri,
            }}
          />
          <View style={styles.imageEditMask}>
            <Text style={{fontSize: 16, color: '#ffffff'}}>편집</Text>
          </View>
        </TouchableOpacity>
      )}

      <Text style={styles.menuTitle}>내용</Text>
      <TextInput
        style={styles.contentInput}
        placeholder="내용을 입력해주세요."
        value={postInfo.content}
        onChangeText={(text: string) =>
          setCampaignInfo({...postInfo, content: text})
        }
        returnKeyType="done"
      />
      {route.params.type === 1 && <View style={{marginTop: '40%'}}></View>}
      {route.params.type !== 1 && <View style={{marginTop: '30%'}}></View>}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => submitCreate()}>
        <Text style={styles.submitText}>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PostEditScreen;
