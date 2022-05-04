import Api from '../lib/customApi';

export async function getCommunityList() {
  const response = await Api.get('/community');
  console.log(response.data);
  return response.data;
}

export async function getCommunityDetail(communitySeq: number) {
  const response = await Api.get(`/community/${communitySeq}`);
  return response.data;
}

export interface Community {
  title: string;
  no: number;
}

export interface CommunityList extends Array<Community> {}
