import React from 'react';
import {Text, useWindowDimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CommunityFeed from './CommunityFeed';
import CommunityMy from './CommunityMy';
import CommunityMain from './CommunityMain';

const Styles = StyleSheet.create({
  text: {
    color: '#ffffff',
  },
});

interface KeywordProps {
  keyword: string;
}

function CommunityTab({keyword}: KeywordProps) {
  const FirstRoute = () => <CommunityMain keyword={keyword} />;
  const SecondRoute = () => <CommunityMy />;
  const ThirdRoute = () => <CommunityFeed />;

  const renderScene = SceneMap({
    main: FirstRoute,
    my: SecondRoute,
    feed: ThirdRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'main', title: '커뮤니티 홈'},
    {key: 'my', title: '나의 커뮤니티'},
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
          indicatorStyle={{backgroundColor: 'rgb(255, 255, 255)'}}
          style={{backgroundColor: 'rgb(95, 162, 229)'}}
          pressColor={'#6D8B74'}
          renderLabel={({route}) => (
            <Text style={Styles.text}>{route.title}</Text>
          )}
        />
      )}
    />
  );
}

export default CommunityTab;
