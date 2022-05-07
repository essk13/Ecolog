import Api from '../lib/customApi';
import {User} from './user';
import {Asset} from 'react-native-image-picker';

export async function savePlogging(ploggingData: PloggingData) {
  const formData = new FormData();
  let resultImg = {
    name: ploggingData.resultImgData.fileName,
    type: ploggingData.resultImgData.type,
    uri: ploggingData.resultImgData.uri,
  };
  let routeImg = {
    name: ploggingData.routeImgData.fileName,
    type: ploggingData.routeImgData.type,
    uri: ploggingData.routeImgData.uri,
  };
  formData.append('images', resultImg);
  formData.append('images', routeImg);
  formData.append('plogging_info', {
    string: JSON.stringify(ploggingData.ploggingInfo),
    type: 'application/json',
  });
  const response = await Api.post<PloggingDetail>('/plogging', formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    transformRequest: formData => formData,
  });
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

export interface PloggingInfo {
  calories: number;
  distance: number;
  started_at: string;
  ended_at: string;
  time: number;
}

export interface RouteImgData {
  fileName: string;
  type: string;
  uri: string;
}

export interface PloggingData {
  ploggingInfo: PloggingInfo;
  resultImgData: Asset;
  routeImgData: RouteImgData;
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
