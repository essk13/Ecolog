import Api, {authApi} from '../lib/customApi';

export async function login(loginData: LoginData) {
  const response = await authApi.post('/auth/login', loginData);
  return {
    accessToken: response.headers.access_token,
    refreshToken: response.headers.refresh_token,
  };
}

export async function logout() {
  const response = await Api.get('/auth/logout');
  return response.data;
}

export interface LoginResponseHeaders {
  accessToken: string;
  refreshToken: string;
}

export interface LoginData {
  email: string;
  login_type: string;
  name: string | null;
}
