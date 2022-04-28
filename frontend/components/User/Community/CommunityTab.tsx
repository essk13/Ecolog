import React from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CommunityFeed from './CommunityFeed';
import CommunityMy from './CommunityMy';
import CommunityMain from './CommunityMain';

const fontStyles = (size?: number, weight?: any) =>
  StyleSheet.create({
    buttonText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: '#FFFFFF',
    },
  });

const FirstRoute = () => <CommunityMain />;
const SecondRoute = () => <CommunityMy />;
const ThirdRoute = () => <CommunityFeed />;

const renderScene = SceneMap({
  main: FirstRoute,
  my: SecondRoute,
  feed: ThirdRoute,
});

function CommunityTab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'main', title: '메인'},
    {key: 'my', title: '내 캠페인'},
    {key: 'feed', title: '피드'},
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
              <Text style={fontStyles(16, '600').buttonText}>
                {route.title}
              </Text>
            </View>
          )}
        />
      )}
    />
  );
}

export default CommunityTab;
