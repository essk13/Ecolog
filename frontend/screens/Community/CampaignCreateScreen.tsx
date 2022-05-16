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
import {createCampaign} from '../../api/community';
import {CampaignInfo} from '../../api/community';
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

function CampaignCreateScreen({route}: any) {
  const [campaignInfo, setCampaignInfo] = React.useState<CampaignInfo>({
    title: '',
    location: '',
    content: '',
    max_personnel: 0,
  });
  const [uri, setUri] = React.useState<string>('');
  const [no, setNo] = React.useState<number>(0);
  const {mutate: createCam} = useMutation(createCampaign);
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    createCam({
      campaignImgData: communityImgData,
      campaignInfo: campaignInfo,
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
        value={campaignInfo.title}
        onChangeText={(text: string) =>
          setCampaignInfo({...campaignInfo, title: text})
        }
        returnKeyType="done"
      />
      <Text>최대인원</Text>
      <TextInput
        placeholder="최대인원"
        keyboardType="numeric"
        value={String(campaignInfo.max_personnel)}
        onChangeText={(text: string) =>
          setCampaignInfo({
            ...campaignInfo,
            max_personnel: Number(text.replace(/[^0-9]/g, '')),
          })
        }
        returnKeyType="done"
      />
      <Text>위치</Text>
      <TextInput
        placeholder="시도"
        value={campaignInfo.location}
        onChangeText={(text: string) =>
          setCampaignInfo({...campaignInfo, location: text})
        }
        returnKeyType="done"
      />
      <Text>컨텐츠</Text>
      <TextInput
        placeholder="시군구"
        value={campaignInfo.content}
        onChangeText={(text: string) =>
          setCampaignInfo({...campaignInfo, content: text})
        }
        returnKeyType="done"
      />
      <TouchableOpacity onPress={() => submitCreate()}>
        <Text>생성</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CampaignCreateScreen;
