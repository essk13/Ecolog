import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/* MainTab */
export type MainTabParamList = {
  Plogging: undefined;
  User: undefined;
  Community: undefined;
  Survey: undefined;
  Avatar: undefined;
};
export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'Main'>;

/* RootStack */
export type RootStackParamList = {
  Main: MainTabNavigationScreenParams;
  PloggingMap: undefined;
  PloggingResult: {
    id: number;
  };
  PloggingRanking: undefined;
  PloggingRecord: {
    id: number;
  };
  UserEdit: undefined;
  UserProfile: {
    id: number;
  };
  UserFollow: {
    userId: number;
    index: number;
  };
  CommunityHome: undefined;
  CommunityCreate: undefined;
  CampaignDetail: undefined;
  CampaignCreate: undefined;
  CampaignEdit: undefined;
  CommunityEdit: undefined;
  SurveyPage: undefined;
  SurveyResult: undefined;
  PostEdit: undefined;
  PostCreate: undefined;
  PostDetail: {
    id: number;
    no: number;
    type: number;
  };
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
