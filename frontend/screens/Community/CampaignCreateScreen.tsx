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
import {useNavigation} from '@react-navigation/native';
import {createCampaign} from '../../api/community';
import {CampaignInfo} from '../../api/community';
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
  halfInput: {
    color: '#000000',
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    width: '95%',
  },
  locaInput: {
    color: '#000000',
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    width: '95%',
  },
  img: {
    flex: 1,
    backgroundColor: '#636363',
  },
  imageEdit: {
    flex: 2,
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

function CampaignCreateScreen({route}: any) {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const [campaignInfo, setCampaignInfo] = React.useState<CampaignInfo>({
    title: '',
    location: '',
    content: '',
    max_personnel: 1,
  });
  const [uri, setUri] = React.useState<string>('image');
  const [no, setNo] = React.useState<number>(0);
  const {mutate: createCam} = useMutation(createCampaign, {
    onSuccess: data => {
      navigation.pop();
      queryClient.invalidateQueries('campaignList');
      navigation.navigate('CampaignDetail', {
        id: data.no,
        no: no,
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
      <Text style={styles.title}>캠페인 만들기</Text>
      <Text style={styles.menuTitle}>이미지</Text>
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
      <Text style={styles.menuTitle}>이름</Text>
      <TextInput
        placeholder="캠페인 이름을 입력해주세요."
        value={campaignInfo.title}
        style={styles.titleInput}
        onChangeText={(text: string) =>
          setCampaignInfo({...campaignInfo, title: text})
        }
        returnKeyType="done"
      />
      <View style={styles.secContainer}>
        <View style={{flex: 1, width: '100%'}}>
          <Text style={styles.menuTitle}>위치</Text>
          <TextInput
            placeholder="지역을 입력해주세요."
            value={campaignInfo.location}
            style={styles.locaInput}
            onChangeText={(text: string) =>
              setCampaignInfo({...campaignInfo, location: text})
            }
            returnKeyType="done"
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.menuTitle}>최대인원</Text>
          <TextInput
            placeholder="제한 인원을 입력해주세요."
            keyboardType="numeric"
            value={String(campaignInfo.max_personnel)}
            style={styles.halfInput}
            onChangeText={(text: string) =>
              setCampaignInfo({
                ...campaignInfo,
                max_personnel: Number(text.replace(/[^0-9]/g, '')),
              })
            }
            returnKeyType="done"
          />
        </View>
      </View>
      <Text style={styles.menuTitle}>컨텐츠</Text>
      <TextInput
        placeholder="설명을 입력해주세요."
        value={campaignInfo.content}
        style={styles.contentInput}
        onChangeText={(text: string) =>
          setCampaignInfo({...campaignInfo, content: text})
        }
        returnKeyType="done"
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => submitCreate()}>
        <Text style={styles.submitText}>생성하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CampaignCreateScreen;
