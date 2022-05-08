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
import {createCommunity} from '../../api/community';
import {CommunityInfo} from '../../api/community';
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

function CommunityCreateScreen() {
  const [communityInfo, setCommunityInfo] = React.useState<CommunityInfo>({
    description: '',
    sido: '',
    sigungu: '',
    tag: '',
    title: '',
  });
  const [uri, setUri] = React.useState<string>('');
  const {mutate: createCommu} = useMutation(createCommunity);
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    createCommu({
      communityImgData: communityImgData,
      communityInfo: communityInfo,
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
        <Text>생성하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CommunityCreateScreen;
