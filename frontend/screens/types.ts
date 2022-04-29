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
  AR: undefined;
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
  PloggingResult: undefined;
  PloggingRanking: undefined;
  PloggingRecord: undefined;
  UserEdit: undefined;
  CommunityHome: undefined;
  SurveyPage: undefined;
  SurveyResult: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
