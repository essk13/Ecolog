import Api from '../lib/customApi';

// 보유 에셋 데이터
export async function getAssetData() {
  const response = await Api.get<AssetData>('/asset');
  return response.data;
}

// 에셋 구매 avatar = 0, room = 1
export async function buyAsset({no, type}: BuyAsset) {
  const response = await Api.post('/asset', {
    assetIdx: no,
    assetType: type,
  });
  return response.data;
}

// 에셋 변경
export async function changeAsset({avatar, room}: ChangeAsset) {
  const response = await Api.put(
    `/user/asset-change?avatarNo=${avatar}&roomNo=${room}`,
  );
  return response.data;
}

export interface AssetData {
  avatar_list: number[];
  room_list: number[];
}

export interface ChangeAsset {
  avatar: number;
  room: number;
}

export interface BuyAsset {
  no: number;
  type: number;
}
