import Api from '../lib/customApi';

// 전체 커뮤니티 리스트
export async function getCommunityList() {
  const response = await Api.get<CommunityList>('/community');
  return response.data;
}

// 인기 커뮤니티 리스트
export async function getHotCommunityList() {
  const response = await Api.get<CommunityList>('/community/popular');
  return response.data;
}

// 내 커뮤니티
export async function getMyCommunity() {
  const response = await Api.get<CommunityList>('/community/mine');
  return response.data;
}

// 커뮤니티 디테일
export async function getCommunityDetail(communitySeq: number) {
  const response = await Api.get<CommunityDetail>(`/community/${communitySeq}`);
  return response.data;
}

// 커뮤니티 가입
export async function postCommunityJoin(communitySeq: number) {
  const response = await Api.post<CommunityDetail>(
    `/community/${communitySeq}`,
  );
  return response.data;
}

// 커뮤니티 탈퇴
export async function deleteCommunityJoin(communitySeq: number) {
  const response = await Api.delete(`/community/${communitySeq}`);
  return response.data;
}

// 커뮤니티 삭제
export async function deleteCommunity(communitySeq: number) {
  const response = await Api.delete(`/community/${communitySeq}/delete`);
  return response.data;
}

// 캠페인 리스트
export async function getCampaignList(communitySeq: number) {
  const response = await Api.get<CampaignList>(
    `/community/${communitySeq}/campaign`,
  );
  return response.data;
}

// 캠페인 디테일
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
  tag: string;
  description: string;
  join: boolean;
  join_count: number;
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
  join: boolean;
  join_count: number;
}

export interface Campaign {
  title: string;
  no: number;
  location: string;
  image: string;
  content: string;
}
export interface CommunityList extends Array<Community> {}
export interface CampaignList extends Array<Campaign> {}
