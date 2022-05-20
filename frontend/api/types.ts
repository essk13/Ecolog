export interface User {
  email: string;
  name: string;
  nickname: string;
  birth: string;
  height: number;
  weight: number;
  phone: string;
  image: string;
  address: string;
}

export interface Plogging {
  startedAt: string;
  endedAt: string;
  image: string;
  route: any;
  time: number;
  distance: number;
  calories: number;
  userSeq: number;
}

export interface PloggingList extends Array<Plogging> {}

export interface Community {
  title: string;
  description: string;
  managerSeq: number;
  image: string;
}

export interface CommunityList extends Array<Community> {}
