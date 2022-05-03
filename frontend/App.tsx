import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  NavigationContainer,
  DefaultTheme,
  CustomTheme,
} from '@react-navigation/native';
import LoginScreen from './screens/Auth/LoginScreen';
import RootScreen from './screens/RootScreen';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from './modules';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from 'react-query';

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

const queryClient = new QueryClient();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  auth().onAuthStateChanged(user => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={customTheme}>
            {!loggedIn && <LoginScreen />}
            {loggedIn && <RootScreen />}
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
