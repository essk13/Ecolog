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
import {editCampaign, CampaignInfo} from '../../api/community';
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

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4e4e4e',
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
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
    marginVertical: 5,
  },
  secContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
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
  halfInput: {
    color: '#000000',
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    paddingLeft: 10,
    width: '100%',
  },
  locaInput: {
    color: '#000000',
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    paddingLeft: 10,
    width: '95%',
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
    marginBottom: 5,
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

function CampaignEditScreen({route}: any) {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
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
      if (route.params.data.image) {
        setUri(route.params.data.image);
      }
    }
  }, [route.params]);
  const {mutate: editCommu} = useMutation(editCampaign, {
    onSuccess: () => {
      Alert.alert('캠페인 수정이 완료되었습니다.');
      navigation.pop();
      queryClient.invalidateQueries('campaignList');
      queryClient.invalidateQueries('campaignDetail');
      navigation.navigate('CampaignDetail', {
        id: route.params.data.no,
        no: route.params.no,
      });
    },
  });
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    if (uri === '') {
      Alert.alert('캠페인 사진을 등록해주세요!');
    } else {
      editCommu({
        campaignImgData: communityImgData,
        campaignInfo: campaignInfo,
        no: route.params.no,
        campaignNo: route.params.data.no,
      });
    }
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
          <Text style={styles.title}>캠페인 수정</Text>
        </View>
        <Text style={styles.menuTitle}>이미지</Text>
        <TouchableOpacity
          activeOpacity={0.7}
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
          activeOpacity={0.7}
          style={styles.submitButton}
          onPress={() => submitCreate()}>
          <Text style={styles.submitText}>수정하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default CampaignEditScreen;
