import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// Components
import UserEditHeader from '../../components/User/UserEdit/UserEditHeader';

const styles = () =>
  StyleSheet.create({
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

function NicknameEdit({userInfo, setUserInfo}: any) {
  return (
    <View style={styles().nicknameContainer}>
      <Text>닉네임</Text>
      <TextInput
        placeholder="닉네임을 입력하세요."
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

function EditButton({navigation}: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles().buttonContainer}
      onPress={() => navigation.pop()}>
      <View style={styles().button}>
        <Text style={fontStyles(20, 'bold', '#ffffff').normalText}>완료</Text>
      </View>
    </TouchableOpacity>
  );
}

interface UserEditScreenProps {
  navigation: any;
}

function UserEditScreen({navigation}: UserEditScreenProps) {
  const [userInfo, setUserInfo] = useState({
    nickname: 'nickname',
    name: '이수환',
    birth: '1821년 15월 32일',
    height: '70',
    weight: '180',
    phone: '011-123-4567',
    address: '뉴욕시 강남구 진평동',
  });

  return (
    <View style={styles().mainContainer}>
      <UserEditHeader navigation={navigation} />
      <View style={styles().imageContainer}>
        <Image
          style={styles().profileImg}
          resizeMode="cover"
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
          }}
        />
        <View style={styles().imageEditMask}>
          <Text style={fontStyles(12, 'normal', '#ffffff').normalText}>
            편집
          </Text>
        </View>
      </View>
      <NicknameEdit userInfo={userInfo} setUserInfo={setUserInfo} />
      <View style={styles().infoContainer}>
        <View style={styles().infoTitleContainer}>
          <Text style={fontStyles(15, 'bold', '#ffffff').normalText}>
            내 정보
          </Text>
        </View>
        <View style={styles().infoEditContainer}>
          <Text style={fontStyles(12).editTitle}>이름</Text>
          <TextInput
            placeholder="이름을 입력하세요."
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
                value={userInfo.height}
                onChangeText={(text: string) =>
                  setUserInfo({...userInfo, height: text})
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
                value={userInfo.weight}
                onChangeText={(text: string) =>
                  setUserInfo({...userInfo, weight: text})
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
            style={styles().infoInput}
            value={userInfo.address}
            onChangeText={(text: string) =>
              setUserInfo({...userInfo, address: text})
            }
            returnKeyType="done"
          />
        </View>
      </View>
      <EditButton navigation={navigation} />
    </View>
  );
}

export default UserEditScreen;
