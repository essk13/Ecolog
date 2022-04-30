import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {
  NavigationContainer,
  DefaultTheme,
  CustomTheme,
} from '@react-navigation/native';
import RootScreen from './screens/RootScreen';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from './modules';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const customTheme: CustomTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '868502337336-e01mlq79efnurdts4ejcmlk3ubrofur2.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      const idToken = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken.idToken,
      );
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.error(error);
    }
  }

  auth().onAuthStateChanged(user => {
    if (user) {
      setLoggedIn(true);
      console.log('LoggedIn');
    } else {
      setLoggedIn(false);
      console.log('LoggedIn LoggedOut');
    }
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={customTheme}>
          {!loggedIn && (
            <View>
              <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
            </View>
          )}
          {loggedIn && <RootScreen />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
