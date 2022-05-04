import Api from '../lib/customApi';

export async function getCommunityList() {
  const response = await Api.get('/community');
  return response.data;
}

export async function getCommunityDetail(communitySeq: number) {
  const response = await Api.get(`/community/${communitySeq}`);
  return response.data;
}

export interface Community {
  title: string;
  description: string;
  managerSeq: number;
  image: string;
}

export interface CommunityList extends Array<Community> {}
