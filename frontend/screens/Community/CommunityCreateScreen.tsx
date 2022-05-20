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
import {createCommunity} from '../../api/community';
import {CommunityInfo} from '../../api/community';
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
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  menuTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    alignSelf: 'center',
  },
  imageEditMask: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#000000',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    width: '100%',
    backgroundColor: 'rgba(95, 162, 229, 0.8)',
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    alignSelf: 'center',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  titleContainer: {
    width: '100%',
    backgroundColor: 'rgba(95, 162, 229, 0.8)',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {},
  img: {
    height: '100%',
    backgroundColor: '#636363',
  },
  imageEdit: {
    height: 150,
    backgroundColor: '#636363',
  },
  nameInput: {
    width: '100%',
    height: 80,
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
    padding: 10,
  },
  tagInput: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
  },
  desInput: {
    width: '100%',
    flexGrow: 1,
    padding: 10,
  },
  label: {
    color: '#c4c4c4',
  },
  textInput: {
    color: '#000000',
  },
  locaContaier: {
    width: '50%',
    borderRightWidth: 1,
    borderColor: '#c4c4c4',
    padding: 10,
  },
  tagContaier: {
    width: '50%',
    padding: 10,
  },
  imgFont: {
    position: 'absolute',
    color: '#ffffff',
    top: '30%',
    right: '35%',
  },
});

function CommunityCreateScreen() {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const [communityInfo, setCommunityInfo] = React.useState<CommunityInfo>({
    description: '',
    sido: '',
    sigungu: '',
    tag: '',
    title: '',
  });
  const [uri, setUri] = React.useState<string>('');
  const {mutate: createCommu} = useMutation(createCommunity, {
    onSuccess: data => {
      Alert.alert('커뮤니티 생성이 완료되었습니다.');
      queryClient.invalidateQueries('CommunityList');
      queryClient.invalidateQueries('myCommunity');
      navigation.pop();
      navigation.navigate('CommunityHome', {id: data.no});
    },
  });
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    if (uri === '') {
      Alert.alert('커뮤니티 사진을 등록해주세요!');
    } else {
      createCommu({
        communityImgData: communityImgData,
        communityInfo: communityInfo,
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
      <View style={styles.titleContainer}>
        <Text style={styles.menuTitle}>커뮤니티 만들기</Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
          {uri === '' && (
            <Text style={styles.imgFont}>이미지를 추가하세요.</Text>
          )}
          <View style={styles.imageEditMask}>
            <Text style={{fontSize: 16, color: '#ffffff'}}>이미지 선택</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <View style={styles.nameInput}>
            <Text style={styles.label}>커뮤니티 이름</Text>
            <TextInput
              placeholder="이름을 입력해주세요."
              value={communityInfo.title}
              onChangeText={(text: string) =>
                setCommunityInfo({...communityInfo, title: text})
              }
              returnKeyType="done"
              style={styles.textInput}
              multiline
            />
          </View>
          <View style={styles.tagInput}>
            <View style={styles.locaContaier}>
              <Text style={styles.label}>지역</Text>
              <TextInput
                placeholder="지역을 입력해주세요."
                value={communityInfo.sido}
                onChangeText={(text: string) =>
                  setCommunityInfo({...communityInfo, sido: text})
                }
                returnKeyType="done"
                style={styles.textInput}
              />
            </View>
            <View style={styles.tagContaier}>
              <Text style={styles.label}>캠페인 태그</Text>
              <TextInput
                placeholder="캠페인을 입력해주세요."
                value={communityInfo.tag}
                onChangeText={(text: string) =>
                  setCommunityInfo({...communityInfo, tag: text})
                }
                returnKeyType="done"
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={styles.desInput}>
            <Text style={styles.label}>커뮤니티 설명</Text>
            <TextInput
              placeholder="커뮤니티를 설명해주세요."
              value={communityInfo.description}
              onChangeText={(text: string) =>
                setCommunityInfo({...communityInfo, description: text})
              }
              returnKeyType="done"
              style={styles.textInput}
              multiline
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.submitButton}
          onPress={() => submitCreate()}>
          <Text style={styles.submitText}>생성하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default CommunityCreateScreen;
