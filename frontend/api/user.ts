import Api from '../lib/customApi';

export async function getUserInfo(userSeq: number) {
  const response = await Api.get(`/user/${userSeq}`);
  return response.data;
}
