import React from 'react';
import {
  CameraOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
// Hooks
import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Api & Types
import {editPost, PostInfo} from '../../api/community';
// Components
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Checkbox} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4e4e4e',
    marginTop: 40,
    marginBottom: 40,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#5FA2E5',
    marginTop: 'auto',
    width: '100%',
    borderRadius: 10,
    height: 60,
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
    fontSize: 16,
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
    minHeight: 50,
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    padding: 0,
    paddingLeft: 10,
    color: '#000000',
  },
  contentInput: {
    minHeight: 100,
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
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
    minHeight: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#dfdfdf',
  },
  imageEditMask: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#000000',
    opacity: 0.8,
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
      if (route.params.data.image) {
        setUri(route.params.data.image);
      }
    }
  }, [route.params]);
  const {mutate: editPo} = useMutation(editPost, {
    onSuccess: () => {
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
      postImgData: uri !== '' ? communityImgData : null,
      postInfo: postInfo,
      no: route.params.no,
      postNo: route.params.data.no,
    });
    Alert.alert('????????? ?????????????????????.');
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
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.titleContainer}>
          {route.params.type === 1 && (
            <Text style={styles.title}>???????????? ??????</Text>
          )}
          {route.params.type === 2 && (
            <Text style={styles.title}>????????? ??????</Text>
          )}
          {route.params.type === 3 && (
            <Text style={styles.title}>?????? ????????? ??????</Text>
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.menuTitle}>??????</Text>
          {route.params.type === 3 && (
            <Text style={{color: '#acacac', marginLeft: 'auto'}}>
              ????????? ?????? ??????
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
          placeholder="????????? ??????????????????."
          value={postInfo.title}
          onChangeText={(text: string) =>
            setCampaignInfo({...postInfo, title: text})
          }
          multiline
          returnKeyType="done"
        />
        {route.params.type !== 1 && (
          <Text style={styles.menuTitle}>?????????</Text>
        )}
        {route.params.type !== 1 && (
          <TouchableOpacity
            onPress={() => launchImageLibrary(imagePickerOption, onPickImage)}
            style={styles.imageEdit}>
            {uri !== '' && (
              <Image
                style={styles.img}
                resizeMode="cover"
                source={{
                  uri: uri,
                }}
              />
            )}
            <View style={styles.imageEditMask}>
              <Text style={{fontSize: 16, color: '#ffffff'}}>??????</Text>
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.menuTitle}>??????</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="????????? ??????????????????."
          value={postInfo.content}
          onChangeText={(text: string) =>
            setCampaignInfo({...postInfo, content: text})
          }
          multiline
          returnKeyType="done"
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.submitButton}
          onPress={() => submitCreate()}>
          <Text style={styles.submitText}>????????????</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default PostEditScreen;
