import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useMutation} from 'react-query';
import {editCommunity, CommunityEditInfo} from '../../api/community';

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

function CommunityEditScreen({route}: any) {
  const [communityInfo, setCommunityInfo] = React.useState<CommunityEditInfo>({
    description: '',
    sido: '',
    sigungu: '',
    tag: '',
    title: '',
    user_no: 1,
  });

  const [uri, setUri] = React.useState<string>('');
  const [no, setNo] = React.useState<number>(0);

  React.useEffect(() => {
    if (route.params.data) {
      setCommunityInfo({
        title: route.params.data.title,
        description: route.params.data.description,
        sido: route.params.data.sido,
        sigungu: route.params.data.sigungu,
        tag: route.params.data.tag,
        user_no: route.params.data.manager.no,
      });
      setUri(route.params.data.image);
      setNo(route.params.data.no);
    }
  }, [route.params.data]);
  const {mutate: editCommu} = useMutation(editCommunity);
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    editCommu({
      communityImgData: communityImgData,
      communityInfo: communityInfo,
      no: no,
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
        value={communityInfo.title}
        onChangeText={(text: string) =>
          setCommunityInfo({...communityInfo, title: text})
        }
        returnKeyType="done"
      />
      <Text>설명글</Text>
      <TextInput
        placeholder="설명"
        value={communityInfo.description}
        onChangeText={(text: string) =>
          setCommunityInfo({...communityInfo, description: text})
        }
        returnKeyType="done"
      />
      <Text>시도</Text>
      <TextInput
        placeholder="시도"
        value={communityInfo.sido}
        onChangeText={(text: string) =>
          setCommunityInfo({...communityInfo, sido: text})
        }
        returnKeyType="done"
      />
      <Text>시군구</Text>
      <TextInput
        placeholder="시군구"
        value={communityInfo.sigungu}
        onChangeText={(text: string) =>
          setCommunityInfo({...communityInfo, sigungu: text})
        }
        returnKeyType="done"
      />
      <Text>태그</Text>
      <TextInput
        placeholder="태그"
        value={communityInfo.tag}
        onChangeText={(text: string) =>
          setCommunityInfo({...communityInfo, tag: text})
        }
        returnKeyType="done"
      />
      <TouchableOpacity onPress={() => submitCreate()}>
        <Text>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CommunityEditScreen;
