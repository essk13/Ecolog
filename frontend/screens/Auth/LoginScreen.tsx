import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {userActions} from '../../modules/user';
import * as Animatable from 'react-native-animatable';
import {ActivityIndicator, Colors} from 'react-native-paper';

const styles = () =>
  StyleSheet.create({
    mainContanier: {
      height: '100%',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    loadingContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 20,
      color: Colors.blueA100,
      marginTop: 10,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainImage: {
      height: 250,
      width: 250,
      marginTop: 90,
      marginBottom: 35,
    },
    title: {
      width: 220,
      height: 80,
    },
    description: {
      width: 300,
      height: 40,
      marginBottom: 40,
    },
  });

function LoginScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '868502337336-e01mlq79efnurdts4ejcmlk3ubrofur2.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      onGoogleButtonPress();
    }
  }, [isLoading]);

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
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <View style={styles().mainContanier}>
      {isLoading && (
        <View style={styles().loadingContainer}>
          <ActivityIndicator
            animating={true}
            size={48}
            color={Colors.blueA100}
          />
          <Text style={styles().loadingText}>입장하는 중</Text>
        </View>
      )}
      {!isLoading && (
        <>
          <View style={styles().logoContainer}>
            <Image
              source={{
                uri: 'https://user-images.githubusercontent.com/87461594/165668437-f7141eee-4de2-4f76-bae4-16a9762b7259.png',
              }}
              style={styles().mainImage}
            />
            <Animatable.Image
              animation="fadeInDown"
              duration={1000}
              useNativeDriver={true}
              source={{
                uri: 'https://user-images.githubusercontent.com/87461594/167839762-2e750cbc-67dc-4368-8ed7-ac676c1a0adf.png',
              }}
              style={styles().title}
              resizeMode="contain"
            />
            <Animatable.Image
              animation="fadeInLeftBig"
              delay={1200}
              source={{
                uri: 'https://user-images.githubusercontent.com/87461594/167839819-75b55956-e5e2-462f-a240-4aa9f6d6285b.png',
              }}
              style={styles().description}
              resizeMode="contain"
            />
          </View>
          <Animatable.View animation="bounceInUp" delay={2000} duration={2000}>
            <GoogleSigninButton onPress={() => setIsLoading(true)} />
          </Animatable.View>
        </>
      )}
    </View>
  );
}

export default LoginScreen;
