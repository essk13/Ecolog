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

export async function getMyRanking() {
  const response = await Api.get<PloggingRank>('plogging/rank/myrank');
  return response.data;
}

export async function getTimeRanking(periodType: string) {
  const response = await Api.get<PloggingRankList>(
    `/plogging/rank/time?type=${periodType}`,
  );
  return response.data;
}

export async function getFollowRanking(periodType: string) {
  const response = await Api.get<PloggingRankList>(
    `/plogging/rank/follow?type=${periodType}`,
  );
  return response.data;
}

export async function getRegionRanking(periodType: string) {
  const response = await Api.get<PloggingRankList>(
    `/plogging/rank/region?type=${periodType}`,
  );
  return response.data;
}

export async function getTrashCanList(locationData: LocationData) {
  const response = await Api.get<TrashCanList>(
    `/trash_can?lat=${locationData.lat}&lng=${locationData.lng}&range=${locationData.range}`,
  );
  return response.data;
}

export async function saveTrashCan(trashCanInput: TrashCanInput) {
  const formData = new FormData();
  let trashCanImg = {
    name: trashCanInput.trashCanImgData.fileName,
    type: trashCanInput.trashCanImgData.type,
    uri: trashCanInput.trashCanImgData.uri,
  };
  formData.append('image', trashCanImg);
  formData.append('trash_can_info', {
    string: JSON.stringify(trashCanInput.trashCanInfo),
    type: 'application/json',
  });
  const response = await Api.post<TrashCan>('/trash_can', formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    transformRequest: formData => formData,
  });
  return response.data;
}

export async function editTrashCan(trashCanInput: TrashCanInput) {
  const formData = new FormData();
  let trashCanImg = {
    name: trashCanInput.trashCanImgData.fileName,
    type: trashCanInput.trashCanImgData.type,
    uri: trashCanInput.trashCanImgData.uri,
  };
  formData.append('image', trashCanImg);
  formData.append('trash_can_info', {
    string: JSON.stringify(trashCanInput.trashCanInfo),
    type: 'application/json',
  });
  const response = await Api.put<TrashCan>(
    `/trash_can/${trashCanInput.no}`,
    formData,
    {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      transformRequest: formData => formData,
    },
  );
  return response.data;
}

export async function deleteTrashCan(no: number) {
  const response = await Api.delete<boolean>(`/trash_can/${no}`);
  return response.data;
}

export interface PloggingInfo {
  calories: number;
  distance: number;
  started_at: string;
  ended_at: string;
  time: number;
}

export interface ImgData {
  fileName: string;
  type: string;
  uri: string;
}

export interface PloggingData {
  ploggingInfo: PloggingInfo;
  resultImgData: Asset;
  routeImgData: ImgData;
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

export interface RankingUser {
  birth: string | null;
  email: string;
  image: string;
  name: string;
  nickname: string;
  no: number;
}

export interface PloggingRank {
  cnt: number;
  dist: number;
  ranking: number;
  user: RankingUser;
}

export interface PloggingRankList extends Array<PloggingRank> {}

export interface LocationData {
  lat: number;
  lng: number;
  range: number;
}

export interface CreatedUser extends RankingUser {}

export interface TrashCan {
  address: string;
  image: string;
  lat: number;
  lng: number;
  no: number;
  user: CreatedUser;
}

export interface TrashCanList extends Array<TrashCan> {}

export interface TrashCanInfo {
  address: string;
  lat: number;
  lng: number;
}

export interface TrashCanInput {
  trashCanImgData: Asset;
  trashCanInfo: TrashCanInfo;
  no: number | null;
}
