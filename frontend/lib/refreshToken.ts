import {AxiosRequestConfig} from 'axios';
import {authApi} from './customApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const refresh = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  let accessToken = await AsyncStorage.getItem('accessToken');

  if (refreshToken) {
    if (accessToken) {
      const {exp} = jwtDecode<JwtPayload>(accessToken);
      if (exp && Date.now() >= exp * 1000) {
        try {
          const response = await authApi.post('/auth/reissue', {
            refresh_token: `${refreshToken}`,
          });
          const newAccessToken = response.headers.access_token;
          AsyncStorage.setItem('accessToken', newAccessToken);
          accessToken = newAccessToken;
        } catch (e: any) {
          Alert.alert('로그인 유지 기간이 만료되었습니다.');
          AsyncStorage.removeItem('accessToken');
          AsyncStorage.removeItem('refreshToken');
          AsyncStorage.removeItem('persist:root');
          auth().signOut();
        }
      }
    }
  }

  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

export {refresh};
