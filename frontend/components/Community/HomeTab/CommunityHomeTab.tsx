import React from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import CommunityHome from './CommunityHome';
import CommunityNotice from './CommunityNotice';
import CommunityPromotion from './CommunityPromotion';
import CommunityFree from './CommunityFree';
import CommunityCampaign from './CommunityCampaign';
import {CommunityDetail} from '../../../api/community';

const Styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#FFFFFF',
  },
});

interface CommunityDetailProps {
  data: CommunityDetail;
}
function CommunityHomeTab({data}: CommunityDetailProps) {
  const FirstRoute = () => <CommunityHome data={data} />;
  const SecondRoute = () => <CommunityNotice data={data} />;
  const ThirdRoute = () => <CommunityPromotion data={data} />;
  const fourthRoute = () => <CommunityFree data={data} />;
  const fifthRoute = () => <CommunityCampaign data={data} />;

  const renderScene = SceneMap({
    home: FirstRoute,
    notice: SecondRoute,
    promotion: ThirdRoute,
    free: fourthRoute,
    campaign: fifthRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: '홈'},
    {key: 'notice', title: '공지사항'},
    {key: 'promotion', title: '캠페인 모집'},
    {key: 'free', title: '자유게시판'},
    {key: 'campaign', title: '캠페인'},
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
              <Text style={Styles.buttonText}>{route.title}</Text>
            </View>
          )}
        />
      )}
    />
  );
}

export default CommunityHomeTab;
