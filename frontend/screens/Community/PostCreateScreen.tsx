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
import {createPost} from '../../api/community';
import {PostInfo} from '../../api/community';
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

function PostCreateScreen({route}: any) {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const [postInfo, setCampaignInfo] = React.useState<PostInfo>({
    title: '',
    open: true,
    content: '',
    type: route.params.type,
  });
  const [uri, setUri] = React.useState<string>('');
  const [no, setNo] = React.useState<number>(0);
  const {mutate: createCam} = useMutation(createPost, {
    onSuccess: data => {
      navigation.pop();
      queryClient.invalidateQueries('CommunityList');
      queryClient.invalidateQueries('myCommunity');
      queryClient.invalidateQueries('postList');
      queryClient.invalidateQueries('postDetail');
      navigation.navigate('PostDetail', {
        id: data.no,
        no: data.community_no,
        type: data.type,
      });
    },
  });
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    createCam({
      postImgData: communityImgData,
      postInfo: postInfo,
      no: no,
    });
    Alert.alert('생성이 완료되었습니다.');
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
  React.useEffect(() => {
    if (route.params.data) {
      setNo(route.params.data.no);
    }
  }, [route.params.data]);
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
        placeholder="컨텐트"
        value={postInfo.content}
        onChangeText={(text: string) =>
          setCampaignInfo({...postInfo, content: text})
        }
        returnKeyType="done"
      />
      <TouchableOpacity onPress={() => submitCreate()}>
        <Text>생성하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PostCreateScreen;
