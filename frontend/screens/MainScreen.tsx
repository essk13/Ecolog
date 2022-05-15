import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';
import PloggingScreen from './PloggingScreen';
import UserScreen from './UserScreen';
import CommunityScreen from './CommunityScreen';
import SurveyScreen from './SurveyScreen';
import AvatarScreen from './AvatarScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fb8c00',
        headerShown: false,
      }}>
      <Tab.Screen name="Plogging" component={PloggingScreen} />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name="Survey" component={SurveyScreen} />
      <Tab.Screen
        name="Avatar"
        component={AvatarScreen}
        options={{
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
