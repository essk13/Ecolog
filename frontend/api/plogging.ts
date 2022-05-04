import Api from '../lib/customApi';
import {User} from './user';

export async function savePlogging(ploggingData: PloggingData) {
  const response = await Api.post('/plogging', ploggingData);
  return response.data;
}

export async function getPloggingList(userSeq: number) {
  const response = await Api.get<PloggingList>(`/plogging/${userSeq}`);
  return response.data;
}

export async function getPloggingDetail(ploggingSeq: number) {
  const response = await Api.get<PloggingDetail>(
    `/plogging/info/${ploggingSeq}`,
  );
  return response.data;
}

export interface PloggingData {
  calories: number;
  distance: number;
  endedAt: string;
  resultImg: string;
  routeImg: string;
  startedAt: string;
  time: number;
}

export interface Plogging {
  calories: number;
  distance: number;
  ended_at: string;
  no: number;
  result_img: string;
  route_img: string;
  started_at: string;
  time: number;
  user: User;
}

export interface PloggingList extends Array<Plogging> {}

export interface PloggingDetail {
  calories: number;
  distance: number;
  ended_at: string;
  no: number;
  result_img: string;
  route_img: string;
  started_at: string;
  time: number;
  user: User;
}
