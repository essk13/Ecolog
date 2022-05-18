import Api from '../lib/customApi';

export async function getMyInfo() {
  const response = await Api.get<User>('/user');
  return response.data;
}

export async function getUserInfo(userSeq: number) {
  const response = await Api.get<UserProfile>(`/user/${userSeq}`);
  return response.data;
}

export async function editUserInfo(editUserData: EditUserData) {
  const formData = new FormData();
  formData.append('image', editUserData.userImgData);
  formData.append('user_info', {
    string: JSON.stringify(editUserData.editUserInfo),
    type: 'application/json',
  });
  const response = await Api.put('/user', formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    transformRequest: formData => formData,
  });
  return response.data;
}

export async function userFollow(userSeq: number) {
  const response = await Api.post<UserProfile>(`/user/${userSeq}/follow`);
  return response.data;
}

export async function getUserPost(userSeq: number) {
  const response = await Api.get<UserPostList>(`/user/${userSeq}/post`);
  return response.data;
}

export interface FollowUser {
  birth: string;
  email: string;
  following: boolean;
  image: string;
  name: string;
  nickname: string;
  no: number;
}

export interface FollowUserList extends Array<FollowUser> {}

export interface User {
  address: string;
  birth: string;
  email: string;
  follower_user: FollowUserList;
  following_user: FollowUserList;
  height: number;
  image: string;
  login_type: string;
  name: string;
  nickname: string;
  no: number;
  phone: string;
  weight: number;
  avatar: number;
  room: number;
  coin: number;
}

export interface UserProfile {
  birth: string;
  email: string;
  following: boolean;
  follower_user: FollowUserList;
  following_user: FollowUserList;
  image: string;
  name: string;
  nickname: string;
  no: number;
  avatar: number;
  room: number;
  coin: number;
}

export interface UserImgData {
  name: string | undefined;
  type: string;
  uri: string;
}

export interface EditUserInfo {
  nickname: string;
  name: string;
  birth: string;
  height: number;
  weight: number;
  phone: string;
  address: string;
}

export interface EditUserData {
  userImgData: UserImgData;
  editUserInfo: EditUserInfo;
}

export interface Writer {
  birth: string;
  email: string;
  image: string;
  name: string;
  nickname: string;
  no: number;
}

export interface UserPost {
  community_no: number;
  content: string;
  created_at: string;
  image: string;
  like_count: number;
  liked: boolean;
  no: number;
  open: boolean;
  title: string;
  writer: Writer;
}

export interface UserPostList extends Array<UserPost> {}
