import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import produce from 'immer';
// Hooks
import {useQuery} from 'react-query';
// Api & Types
import {RootStackNavigationProp, RootStackParamList} from '../types';
import {getUserInfo} from '../../api/user';
// Components
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';
import UserFollower from '../../components/User/UserFollow/UserFollower';
import UserFollowing from '../../components/User/UserFollow/UserFollowing';

// Style
const styles = () =>
  StyleSheet.create({
    headerContainer: {
      width: '100%',
      height: '6%',
      backgroundColor: '#5FA2E5',
      justifyContent: 'flex-end',
      paddingBottom: '2%',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 15,
    },
  });

const fontStyles = (size?: number, weight?: any) =>
  StyleSheet.create({
    nameText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: '#FFFFFF',
      marginLeft: 15,
    },
    buttonText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: '#FFFFFF',
    },
  });

type UserFollowScreenRouteProp = RouteProp<RootStackParamList, 'UserFollow'>;

function UserFollowScreen() {
  const route = useRoute<UserFollowScreenRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const layout = useWindowDimensions();
  const userProfile = useQuery(['userProfile', route.params.userId], () =>
    getUserInfo(route.params.userId),
  );
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {
      key: 'follower',
      title: '팔로워 0',
    },
    {
      key: 'following',
      title: '팔로잉 0',
    },
  ]);

  useEffect(() => {
    setIndex(route.params.index);
  }, [route.params.index]);

  useEffect(() => {
    if (userProfile.data) {
      setRoutes(
        produce(draft => {
          draft[0].title = `팔로워  ${userProfile.data.follower_user.length}`;
          draft[1].title = `팔로잉  ${userProfile.data.following_user.length}`;
        }),
      );
    }
  }, [userProfile.data]);

  const FirstRoute = () => (
    <UserFollower
      followerUserList={userProfile.data ? userProfile.data.follower_user : []}
    />
  );
  const SecondRoute = () => (
    <UserFollowing
      followingUserList={
        userProfile.data ? userProfile.data.following_user : []
      }
    />
  );

  const renderScene = SceneMap({
    follower: FirstRoute,
    following: SecondRoute,
  });

  return (
    <>
      <View style={styles().headerContainer}>
        <TouchableOpacity
          style={styles().backButton}
          onPress={() => navigation.pop()}>
          <Icon name="left" size={24} color="white" />
          <Text style={fontStyles(20, '400').nameText}>
            {userProfile.data ? userProfile.data.name : ''}
          </Text>
        </TouchableOpacity>
      </View>
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
    </>
  );
}

export default UserFollowScreen;
