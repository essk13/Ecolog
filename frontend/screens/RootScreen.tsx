import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import PloggingMapScreen from './Plogging/PloggingMapScreen';
import PloggingResultScreen from './Plogging/PloggingResultScreen';
import PloggingRankingScreen from './Plogging/PloggingRankingScreen';
import SurveyPageScreen from './Survey/SurveyPageScreen';
import SurveyResultScreen from './Survey/SurveyResultScreen';
import CommunityHomeScreen from './Community/CommunityHome';

const Stack = createNativeStackNavigator();

function RootScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="PloggingMap" component={PloggingMapScreen} />
      <Stack.Screen name="PloggingResult" component={PloggingResultScreen} />
      <Stack.Screen name="PloggingRanking" component={PloggingRankingScreen} />
      <Stack.Screen name="SurveyPage" component={SurveyPageScreen} />
      <Stack.Screen name="SurveyResult" component={SurveyResultScreen} />
      <Stack.Screen name="CommunityHome" component={CommunityHomeScreen} />
    </Stack.Navigator>
  );
}

export default RootScreen;
