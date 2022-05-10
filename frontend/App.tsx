import React from 'react';
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
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={customTheme}>
            <RootScreen />
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
