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

// 커뮤니티 생성
export async function createCommunity(communityData: CreateCommunityData) {
  const formData = new FormData();
  formData.append('image', communityData.communityImgData);
  formData.append('community_info', {
    string: JSON.stringify(communityData.communityInfo),
    type: 'application/json',
  });
  const response = await Api.post<Community>('/community', formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    transformRequest: formData => formData,
  });
  return response.data;
}
// 캠페인 생성
export async function createCampaign(campaignData: CreateCampaignData) {
  const formData = new FormData();
  formData.append('image', campaignData.campaignImgData);
  formData.append('communityNo ', campaignData.no);
  formData.append('campaign_info ', {
    string: JSON.stringify(campaignData.campaignInfo),
    type: 'application/json',
  });
  const response = await Api.post(
    `/community/${campaignData.no}/campaign`,
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
// 캠페인 수정
export async function editCampaign(campaignData: EditCampaignData) {
  const formData = new FormData();
  formData.append('image', campaignData.campaignImgData);
  formData.append('campaignNo', campaignData.campaignNo);
  formData.append('campaign_info', {
    string: JSON.stringify(campaignData.campaignInfo),
    type: 'application/json',
  });
  const response = await Api.put<Campaign>(
    `/community/${campaignData.no}/campaign/${campaignData.campaignNo}`,
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
// 캠페인 삭제
export async function deleteCampaign(data: DeleteCampaignData) {
  const response = await Api.delete(
    `/community/${data.communitySeq}/campaign/${data.campaignSeq}`,
  );
  return response.data;
}
// 커뮤니티 수정
export async function editCommunity(communityData: EditCommunityData) {
  const formData = new FormData();
  formData.append('image', communityData.communityImgData);
  formData.append('community_info', {
    string: JSON.stringify(communityData.communityInfo),
    type: 'application/json',
  });
  const response = await Api.put<Community>(
    `/community/${communityData.no}`,
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
// 포스트 리스트
export async function getPostList(data: PostListData) {
  const response = await Api.get<PostList>(
    `/community/${data.no}/post?type=${data.type}`,
  );
  console.log(response.data);
  return response.data;
}
// 포스트 디테일
export async function getPostDetail(communitySeq: number, postSeq: number) {
  const response = await Api.get<Post>(
    `/community/${communitySeq}/post/${postSeq}`,
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
  sido: string;
  sigungu: string;
  join: boolean;
  join_count: number;
}
export interface Manager {
  email: string;
  image: string;
}

export interface CommunityInfo {
  description: string;
  sido: string;
  sigungu: string;
  tag: string;
  title: string;
}

export interface CommunityEditInfo {
  description: string;
  sido: string;
  sigungu: string;
  tag: string;
  title: string;
  user_no: number;
}
export interface CommunityImgData {
  name: string | undefined;
  type: string;
  uri: string;
}
export interface CreateCommunityData {
  communityImgData: CommunityImgData;
  communityInfo: CommunityInfo;
}
export interface PostListData {
  no: number;
  type: string;
}
export interface EditCommunityData {
  communityImgData: CommunityImgData;
  communityInfo: CommunityEditInfo;
  no: number;
}
export interface DeleteCampaignData {
  communitySeq: number;
  campaignSeq: number;
}
export interface CreateCampaignData {
  campaignImgData: CommunityImgData;
  campaignInfo: CampaignInfo;
  no: number;
}
export interface EditCampaignData {
  campaignImgData: CommunityImgData;
  campaignInfo: CampaignInfo;
  no: number;
  campaignNo: number;
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
  sido: string;
  sigungu: string;
}

export interface Campaign {
  title: string;
  no: number;
  location: string;
  image: string;
  content: string;
  max_personnel: number;
  writer: Manager;
}
export interface Post {
  community_no: string;
  content: string;
  like_count: number;
  no: number;
  open: boolean;
  title: string;
  writer: Manager;
}
export interface CampaignInfo {
  title: string;
  location: string;
  content: string;
  max_personnel: number;
}
export interface CommunityList extends Array<Community> {}
export interface CampaignList extends Array<Campaign> {}
export interface PostList extends Array<Post> {}
