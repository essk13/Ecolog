import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';
import PloggingScreen from './PloggingScreen';
import UserScreen from './UserScreen';
import CommunityScreen from './CommunityScreen';
import SurveyScreen from './SurveyScreen';
import AvatarScreen from './AvatarScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainScreen() {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        tabBarActiveTintColor: '#5FA2E5',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Plogging"
        component={PloggingScreen}
        options={{
          title: '플로깅',
          tabBarIcon: ({color, size}) => (
            <Icon name="directions-run" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          title: '내 정보',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: '커뮤니티',
          tabBarIcon: ({color, size}) => (
            <IconI name="chatbubbles-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Survey"
        component={SurveyScreen}
        options={{
          title: '설문조사',
          tabBarIcon: ({color, size}) => (
            <IconM name="clipboard-check-multiple" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Avatar"
        component={AvatarScreen}
        options={{
          title: '마이룸',
          tabBarIcon: ({color, size}) => (
            <Icon name="face-retouching-natural" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
