import Api from '../lib/customApi';

export async function getCommunityList() {
  const response = await Api.get<CommunityList>('/community');
  return response.data;
}
export async function getHotCommunityList() {
  const response = await Api.get<CommunityList>('/community/popular');
  return response.data;
}
export async function getCommunityDetail(communitySeq: number) {
  const response = await Api.get<CommunityDetail>(`/community/${communitySeq}`);
  return response.data;
}
export async function getMyCommunity() {
  const response = await Api.get<CommunityList>('/community/mine');
  return response.data;
}

export async function getCampaignList(communitySeq: number) {
  const response = await Api.get<CampaignList>(
    `/community/${communitySeq}/campaign`,
  );
  return response.data;
}
export async function getCampaignDetail(
  communitySeq: number,
  campaignSeq: number,
) {
  const response = await Api.get<Campaign>(
    `/community/${communitySeq}/campaign/${campaignSeq}`,
  );
  return response.data;
}
export interface Community {
  title: string;
  no: number;
  manager: Manager;
  image: string;
}
export interface Manager {
  email: string;
  image: string;
}

export interface CommunityDetail {
  title: string;
  no: number;
  manager: Manager;
  image: string;
  tag: string;
  description: string;
}
export interface CommunityList extends Array<Community> {}

export interface Campaign {
  title: string;
  no: number;
  location: string;
  image: string;
  content: string;
}

export interface CampaignList extends Array<Campaign> {}
