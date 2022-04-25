import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PloggingScreen from './PloggingScreen';
import UserScreen from './UserScreen';
import CommunityScreen from './CommunityScreen';
import SurveyScreen from './SurveyScreen';
import ARScreen from './ARScreen';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fb8c00',
        headerShown: false,
      }}>
      <Tab.Screen name="Plogging" component={PloggingScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Survey" component={SurveyScreen} />
      <Tab.Screen name="AR" component={ARScreen} />
    </Tab.Navigator>
  );
}

export default MainScreen;
