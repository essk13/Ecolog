import axios from 'axios';
import {refresh} from './refreshToken';

const baseURL = 'https://k6d101.p.ssafy.io/api/v1';

export const authApi = axios.create({
  baseURL,
});

const Api = axios.create({
  baseURL,
});

Api.interceptors.request.use(refresh);

export default Api;
