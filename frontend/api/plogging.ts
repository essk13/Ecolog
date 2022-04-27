import Api from '../lib/customApi';

export async function getPloggingList(userSeq: number) {
  const response = await Api.get(`/plogging/${userSeq}`);
  return response.data;
}

export async function getPloggingDetail(ploggingSeq: number) {
  const response = await Api.get(`/plogging/info/${ploggingSeq}`);
  return response.data;
}
