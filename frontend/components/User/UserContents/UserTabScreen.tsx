import React from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
// Components
import UserPlogging from './Plogging/UserPlogging';
import UserCampaign from './Campaign/UserCampaign';
import UserAvatar from './Avatar/UserAvatar';

// Style
const fontStyles = (size?: number, weight?: any) =>
  StyleSheet.create({
    buttonText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: '#FFFFFF',
    },
  });

// Tab-View
const FirstRoute = () => <UserPlogging />;
const SecondRoute = () => <UserCampaign />;
const ThirdRoute = () => <UserAvatar />;

const renderScene = SceneMap({
  plogging: FirstRoute,
  campaign: SecondRoute,
  avatar: ThirdRoute,
});

function UserTab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'plogging', title: '플로깅'},
    {key: 'campaign', title: '캠페인'},
    {key: 'avatar', title: '아바타'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#FFF'}}
          style={{backgroundColor: '#5FA2E5'}}
          pressColor={'#548dc5'}
          renderLabel={({route}) => (
            <View>
              <Text style={fontStyles(18, '600').buttonText}>
                {route.title}
              </Text>
            </View>
          )}
        />
      )}
    />
  );
}

export default UserTab;
