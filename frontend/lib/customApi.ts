import axios from 'axios';

const baseURL = 'https://k6d101.p.ssafy.io/api/v1';

export const authApi = axios.create({
  baseURL,
});

const Api = axios.create({
  baseURL,
});

export default Api;
