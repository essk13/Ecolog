import {AxiosRequestConfig} from 'axios';
import {authApi} from './customApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {Alert} from 'react-native';

const refresh = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  let jwtToken = await AsyncStorage.getItem('jwtToken');

  if (refreshToken) {
    if (jwtToken) {
      const {exp} = jwtDecode<JwtPayload>(jwtToken);
      if (exp && Date.now() >= exp * 1000) {
        try {
          const response = await authApi.post('/auth/reissue', {
            refresh_token: `Bearer ${refreshToken}`,
          });
          const newJwtToken = response.headers.authorization.split(' ')[1];
          AsyncStorage.setItem('jwtToken', newJwtToken);
          jwtToken = newJwtToken;
        } catch (e: any) {
          Alert.alert('로그인 유지 기간이 만료되었습니다.');
          AsyncStorage.removeItem('refreshToken');
          AsyncStorage.removeItem('jwtToken');
          AsyncStorage.removeItem('persist:root');
          // window.dispatchEvent(new Event('storage'));
        }
      }
    }
  }

  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${jwtToken}`;

  return config;
};

export {refresh};
