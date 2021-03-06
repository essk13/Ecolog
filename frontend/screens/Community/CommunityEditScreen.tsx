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
import {editCommunity, CommunityEditInfo} from '../../api/community';
// Components
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
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
      if (route.params.data.image) {
        setUri(route.params.data.image);
      }
      setNo(route.params.data.no);
    }
  }, [route.params.data]);

  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const {mutate: editCommu} = useMutation(editCommunity, {
    onSuccess: () => {
      Alert.alert('????????? ?????????????????????.');
      navigation.pop();
      queryClient.invalidateQueries('CommunityDetail');
      queryClient.invalidateQueries('CommunityList');
      queryClient.invalidateQueries('myCommunity');
      navigation.navigate('CommunityHome', {id: no});
    },
  });
  const submitCreate = () => {
    const communityImgData = {
      name: uri.split('/').pop(),
      type: 'image/jpeg',
      uri: uri,
    };
    if (uri === '') {
      Alert.alert('???????????? ????????? ??????????????????!');
    } else {
      editCommu({
        communityImgData: communityImgData,
        communityInfo: communityInfo,
        no: no,
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
        <Text style={styles.menuTitle}>???????????? ?????? ??????</Text>
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
          <View style={styles.imageEditMask}>
            <Text style={{fontSize: 16, color: '#ffffff'}}>??????</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <View style={styles.nameInput}>
            <Text style={styles.label}>???????????? ??????</Text>
            <TextInput
              placeholder="????????? ??????????????????."
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
              <Text style={styles.label}>??????</Text>
              <TextInput
                placeholder="????????? ??????????????????."
                value={communityInfo.sido}
                onChangeText={(text: string) =>
                  setCommunityInfo({...communityInfo, sido: text})
                }
                returnKeyType="done"
              />
            </View>
            <View style={styles.tagContaier}>
              <Text style={styles.label}>????????? ??????</Text>
              <TextInput
                placeholder="???????????? ??????????????????."
                value={communityInfo.tag}
                onChangeText={(text: string) =>
                  setCommunityInfo({...communityInfo, tag: text})
                }
                returnKeyType="done"
              />
            </View>
          </View>
          <View style={styles.desInput}>
            <Text style={styles.label}>???????????? ??????</Text>
            <TextInput
              placeholder="??????????????? ??????????????????."
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
          <Text style={styles.submitText}>????????????</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default CommunityEditScreen;
