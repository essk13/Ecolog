import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import {editPost, PostInfo} from '../../api/community';
import {useNavigation} from '@react-navigation/native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

function PostEditScreen({route}: any) {
  console.log(route.params.type);
  const [postInfo, setCampaignInfo] = React.useState<PostInfo>({
    title: '',
    open: false,
    content: '',
    type: route.params.type,
  });
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const [uri, setUri] = React.useState<string>('https://ecolog-bucket.s3.ap-northeast-2.amazonaws.com/Ecolog_file_default_profile.jpg');
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
      console.log(data);
      navigation.pop();
      queryClient.invalidateQueries('postList');
      queryClient.invalidateQueries('postDetail');
      navigation.navigate('PostDetail', {
        id: route.params.data.no,
        no: route.params.data.community_no,
        type: route.params.type,
      });
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
      <TouchableOpacity
        onPress={() => launchImageLibrary(imagePickerOption, onPickImage)}>
        <Text>이미지</Text>
      </TouchableOpacity>
      <Text>이름</Text>
      <TextInput
        placeholder="이름"
        value={postInfo.title}
        onChangeText={(text: string) =>
          setCampaignInfo({...postInfo, title: text})
        }
        returnKeyType="done"
      />
      <Text>컨텐츠</Text>
      <TextInput
        placeholder="컨텐츠"
        value={postInfo.content}
        onChangeText={(text: string) =>
          setCampaignInfo({...postInfo, content: text})
        }
        returnKeyType="done"
      />
      <TouchableOpacity onPress={() => submitCreate()}>
        <Text>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PostEditScreen;
