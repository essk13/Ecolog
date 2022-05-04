import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {userActions} from '../../modules/user';

const styles = () =>
  StyleSheet.create({
    mainContanier: {
      height: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    mainImage: {
      height: 250,
      width: 250,
    },
  });

function LoginScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '868502337336-e01mlq79efnurdts4ejcmlk3ubrofur2.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const loginData = {
        email: userInfo.user.email,
        login_type: 'GOOGLE',
        name: userInfo.user.name,
      };
      dispatch(userActions.loginAsync.request(loginData));
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <View style={styles().mainContanier}>
      <Image
        source={{
          uri: 'https://user-images.githubusercontent.com/87461594/165668437-f7141eee-4de2-4f76-bae4-16a9762b7259.png',
        }}
        style={styles().mainImage}
      />
      <Text>에코로그</Text>
      <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
    </View>
  );
}

export default LoginScreen;
