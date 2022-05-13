import {useNavigation} from '@react-navigation/native';
import React, {Dispatch, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useMutation} from 'react-query';
import {useSelector} from 'react-redux';
import {editUserInfo, EditUserInfo} from '../../api/user';
import {RootState} from '../../modules';
import {RootStackNavigationProp} from '../types';
// Components
import UserEditHeader from '../../components/User/UserEdit/UserEditHeader';
import {useDispatch} from 'react-redux';
import {userActions} from '../../modules/user';

const styles = () =>
  StyleSheet.create({
    scrollContainer: {
      width: '100%',
    },
    mainContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginTop: 25,
      marginBottom: 5,
      elevation: 4,
    },
    profileImg: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    imageEditMask: {
      position: 'absolute',
      bottom: 0,
      width: 100,
      height: 24,
      backgroundColor: '#000000',
      opacity: 0.8,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nicknameContainer: {
      width: '60%',
      height: 60,
      marginBottom: 20,
    },
    nicknameInput: {
      width: '100%',
      height: 40,
      borderColor: '#ABABAB',
      borderWidth: 1,
      textAlign: 'center',
      marginTop: 2,
      color: '#000000',
    },
    infoTitleContainer: {
      width: '100%',
      height: 35,
      justifyContent: 'center',
      backgroundColor: 'rgba(95, 162, 229, 0.8)',
      paddingLeft: 14,
    },
    infoContainer: {
      width: '100%',
      flexGrow: 1,
    },
    infoEditContainer: {
      width: '100%',
      height: 70,
      borderBottomColor: 'rgba(95, 162, 229, 0.8)',
      borderBottomWidth: 1,
    },
    infoInput: {
      width: '100%',
      flexGrow: 1,
      paddingLeft: 14,
      color: '#000000',
    },
    statusEditContainer: {
      flexDirection: 'row',
      width: '100%',
      height: 70,
      borderBottomColor: 'rgba(95, 162, 229, 0.8)',
      borderBottomWidth: 1,
    },
    heightEditContainer: {
      width: '50%',
      height: '100%',
      borderRightColor: 'rgba(95, 162, 229, 0.8)',
      borderRightWidth: 1,
    },
    weightEditContainer: {
      width: '50%',
      height: '100%',
    },
    statusInputContainer: {
      flexDirection: 'row',
      flexGrow: 1,
      width: '100%',
      alignItems: 'center',
    },
    statusInput: {
      height: '100%',
      flexGrow: 1,
      paddingLeft: 14,
      textAlign: 'right',
      color: '#000000',
    },
    buttonContainer: {
      width: '100%',
      height: 60,
    },
    button: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5FA2E5',
    },
  });

const fontStyles = (size?: number, weight?: any, color?: string) =>
  StyleSheet.create({
    normalText: {
      fontSize: size || 16,
      fontWeight: weight || 'normal',
      color: color || '#000000',
    },
    editTitle: {
      fontSize: size || 16,
      fontWeight: weight || 'normal',
      marginTop: 10,
      marginLeft: 14,
      color: '#6C6C6C',
    },
    unit: {
      fontSize: size || 16,
      fontWeight: weight || 'normal',
      marginLeft: 2,
      marginRight: 20,
      color: '#6C6C6C',
    },
  });

interface NicknameEditProps {
  userInfo: EditUserInfo;
  setUserInfo: Dispatch<EditUserInfo>;
}

function NicknameEdit({userInfo, setUserInfo}: NicknameEditProps) {
  return (
    <View style={styles().nicknameContainer}>
      <Text style={fontStyles(12, 'normal', '#6C6C6C').normalText}>
        닉네임 (필수)
      </Text>
      <TextInput
        placeholder="닉네임을 입력하세요."
        placeholderTextColor="#ABABAB"
        style={styles().nicknameInput}
        value={userInfo.nickname}
        onChangeText={(text: string) =>
          setUserInfo({...userInfo, nickname: text})
        }
        returnKeyType="done"
      />
    </View>
  );
}

function EditButton({onClick}: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles().buttonContainer}
      onPress={onClick}>
      <View style={styles().button}>
        <Text style={fontStyles(20, 'bold', '#ffffff').normalText}>완료</Text>
      </View>
    </TouchableOpacity>
  );
}

function UserEditScreen() {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [profileImgUri, setProfileImgUri] = useState<string>(
    'https://ecolog-bucket.s3.ap-northeast-2.amazonaws.com/Ecolog_file_default_profile.jpg',
  );
  const [userInfo, setUserInfo] = useState<EditUserInfo>({
    nickname: '',
    name: '',
    birth: '',
    height: 0,
    weight: 0,
    phone: '',
    address: '',
  });
  const {mutate: editUser} = useMutation(editUserInfo, {
    onSuccess: () => {
      dispatch(userActions.getMyInfoAsync.request(null));
      navigation.pop();
    },
    onError: error => {
      console.error(error);
    },
  });
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    if (myInfo.data) {
      setProfileImgUri(myInfo.data.image);
      setUserInfo({
        nickname: myInfo.data.nickname,
        name: myInfo.data.name,
        birth: myInfo.data.birth,
        height: myInfo.data.height,
        weight: myInfo.data.weight,
        phone: myInfo.data.phone,
        address: myInfo.data.address,
      });
    }
  }, [myInfo]);

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
      setProfileImgUri(res.assets[0].uri);
    }
  };

  const onClickEditButton = () => {
    if (userInfo.nickname !== '' && userInfo.name !== '') {
      const userImgData = {
        name: profileImgUri.split('/').pop(),
        type: 'image/jpeg',
        uri: profileImgUri,
      };
      editUser({userImgData: userImgData, editUserInfo: userInfo});
    } else {
      Alert.alert('닉네임과 이름은 필수입니다!');
    }
  };

  return (
    <View style={styles().mainContainer}>
      <UserEditHeader />
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles().imageContainer}
          onPress={() => launchImageLibrary(imagePickerOption, onPickImage)}>
          <Image
            style={styles().profileImg}
            resizeMode="cover"
            source={{
              uri: profileImgUri,
            }}
          />
          <View style={styles().imageEditMask}>
            <Text style={fontStyles(12, 'normal', '#ffffff').normalText}>
              편집
            </Text>
          </View>
        </TouchableOpacity>
        <NicknameEdit userInfo={userInfo} setUserInfo={setUserInfo} />
        <View style={styles().infoContainer}>
          <View style={styles().infoTitleContainer}>
            <Text style={fontStyles(15, 'bold', '#ffffff').normalText}>
              내 정보
            </Text>
          </View>
          <View style={styles().infoEditContainer}>
            <Text style={fontStyles(12).editTitle}>이름 (필수)</Text>
            <TextInput
              placeholder="이름을 입력하세요."
              placeholderTextColor="#ABABAB"
              style={styles().infoInput}
              value={userInfo.name}
              onChangeText={(text: string) =>
                setUserInfo({...userInfo, name: text})
              }
              returnKeyType="done"
            />
          </View>
          <View style={styles().infoEditContainer}>
            <Text style={fontStyles(12).editTitle}>생년월일</Text>
            <TextInput
              placeholder="생년월일을 입력하세요."
              placeholderTextColor="#ABABAB"
              style={styles().infoInput}
              value={userInfo.birth}
              onChangeText={(text: string) =>
                setUserInfo({...userInfo, birth: text})
              }
              returnKeyType="done"
            />
          </View>
          <View style={styles().statusEditContainer}>
            <View style={styles().heightEditContainer}>
              <Text style={fontStyles(12).editTitle}>키</Text>
              <View style={styles().statusInputContainer}>
                <TextInput
                  placeholder="키를 입력하세요."
                  style={styles().statusInput}
                  keyboardType="numeric"
                  value={String(userInfo.height)}
                  onChangeText={(text: string) =>
                    setUserInfo({
                      ...userInfo,
                      height: Number(text.replace(/[^0-9]/g, '')),
                    })
                  }
                  returnKeyType="done"
                />
                <Text style={fontStyles().unit}>cm</Text>
              </View>
            </View>
            <View style={styles().weightEditContainer}>
              <Text style={fontStyles(12).editTitle}>몸무게</Text>
              <View style={styles().statusInputContainer}>
                <TextInput
                  placeholder="몸무게를 입력하세요."
                  style={styles().statusInput}
                  keyboardType="numeric"
                  value={String(userInfo.weight)}
                  onChangeText={(text: string) =>
                    setUserInfo({
                      ...userInfo,
                      weight: Number(text.replace(/[^0-9]/g, '')),
                    })
                  }
                  returnKeyType="done"
                />
                <Text style={fontStyles().unit}>kg</Text>
              </View>
            </View>
          </View>
          <View style={styles().infoEditContainer}>
            <Text style={fontStyles(12).editTitle}>연락처</Text>
            <TextInput
              placeholder="연락처를 입력하세요."
              placeholderTextColor="#ABABAB"
              style={styles().infoInput}
              value={userInfo.phone}
              onChangeText={(text: string) =>
                setUserInfo({...userInfo, phone: text})
              }
              returnKeyType="done"
            />
          </View>
          <View style={styles().infoEditContainer}>
            <Text style={fontStyles(12).editTitle}>주소지</Text>
            <TextInput
              placeholder="주소지를 입력하세요."
              placeholderTextColor="#ABABAB"
              style={styles().infoInput}
              value={userInfo.address}
              onChangeText={(text: string) =>
                setUserInfo({...userInfo, address: text})
              }
              returnKeyType="done"
            />
          </View>
        </View>
        <EditButton onClick={onClickEditButton} />
      </ScrollView>
    </View>
  );
}

export default UserEditScreen;
