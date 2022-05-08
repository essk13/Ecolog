import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
// Screens
import MainScreen from './MainScreen';
import PloggingMapScreen from './Plogging/PloggingMapScreen';
import PloggingResultScreen from './Plogging/PloggingResultScreen';
import PloggingRankingScreen from './Plogging/PloggingRankingScreen';
import PloggingRecordScreen from './Plogging/PloggingRecordScreen';
import UserEditScreen from './User/UserEditScreen';
import CommunityHomeScreen from './Community/CommunityHome';
import SurveyPageScreen from './Survey/SurveyPageScreen';
import SurveyResultScreen from './Survey/SurveyResultScreen';
import CampaignDetailScreen from './Community/CampaignDetailScreen';
import CommunityCreateScreen from './Community/CommunityCreateScreen';
import CommunityEditScreen from './Community/CommunityEditScreen';
import CampaignCreateScreen from './Community/CampaignCreateScreen';
import CampaignEditScreen from './Community/CampaignEditScreen';
import PostEditScreen from './Community/PostEditScreen';
import PostDetailScreen from './Community/PostDetailScreen';
import PostCreateScreen from './Community/PostCreateScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="PloggingMap" component={PloggingMapScreen} />
      <Stack.Screen name="PloggingResult" component={PloggingResultScreen} />
      <Stack.Screen name="PloggingRanking" component={PloggingRankingScreen} />
      <Stack.Screen name="PloggingRecord" component={PloggingRecordScreen} />
      <Stack.Screen name="UserEdit" component={UserEditScreen} />
      <Stack.Screen name="CommunityHome" component={CommunityHomeScreen} />
      <Stack.Screen name="CommunityCreate" component={CommunityCreateScreen} />
      <Stack.Screen name="CommunityEdit" component={CommunityEditScreen} />
      <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} />
      <Stack.Screen name="CampaignCreate" component={CampaignCreateScreen} />
      <Stack.Screen name="CampaignEdit" component={CampaignEditScreen} />
      <Stack.Screen name="PostEdit" component={PostEditScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="PostCreate" component={PostCreateScreen} />
      <Stack.Screen name="SurveyPage" component={SurveyPageScreen} />
      <Stack.Screen name="SurveyResult" component={SurveyResultScreen} />
    </Stack.Navigator>
  );
}

export default RootScreen;
