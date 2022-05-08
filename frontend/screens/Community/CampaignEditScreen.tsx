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
import {editCampaign, CampaignInfo} from '../../api/community';
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

function CampaignEditScreen({route}: any) {
  const [campaignInfo, setCampaignInfo] = React.useState<CampaignInfo>({
    title: '',
    location: '',
    content: '',
    max_personnel: 0,
  });

  const [uri, setUri] = React.useState<string>('');
  React.useEffect(() => {
    if (route.params.data) {
      setCampaignInfo({
        title: route.params.data.title,
        location: route.params.data.location,
        content: route.params.data.content,
        max_personnel: route.params.data.max_personnel,
      });
      setUri(route.params.data.image);
    }
  }, [route.params]);
  const {mutate: editCommu} = useMutation(editCampaign);
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    editCommu({
      campaignImgData: communityImgData,
      campaignInfo: campaignInfo,
      no: route.params.no,
      campaignNo: route.params.data.no,
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
        <Text>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CampaignEditScreen;
