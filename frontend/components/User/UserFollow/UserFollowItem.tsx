import React from 'react';
import {userActions} from '../../../modules/user';
// Hooks
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation, useQueryClient} from 'react-query';
// Api & Types
import {FollowUser, userFollow} from '../../../api/user';
import {RootStackNavigationProp} from '../../../screens/types';
import {RootState} from '../../../modules';
// Components
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const styles = () =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      width: '90%',
      height: 90,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 1,
      marginLeft: '5%',
      paddingLeft: 15,
      marginBottom: 15,
    },
    contentContainer: {
      flexDirection: 'row',
      height: '100%',
      alignItems: 'center',
    },
    userImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    followingButton: {
      flexDirection: 'row',
      width: 100,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#4e5fff',
      marginRight: 15,
    },
    followButton: {
      flexDirection: 'row',
      width: 100,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#4e5fff',
      marginRight: 15,
    },
  });

const fontStyles = (size?: number, weight?: any, color?: string) =>
  StyleSheet.create({
    nameText: {
      fontSize: 20,
      fontWeight: '600',
    },
    buttonText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#FFFFFF',
      marginLeft: 5,
    },
  });

interface UserFollowItemProps {
  followUser: FollowUser;
}

function UserFollowItem({followUser}: UserFollowItemProps) {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const follow = useMutation(userFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', followUser.no]);
      queryClient.invalidateQueries(['userProfile', myInfo.data?.no]);
      dispatch(userActions.getMyInfoAsync.request(null));
    },
    onError: error => {
      console.error(error);
    },
  });

  return (
    <TouchableOpacity
      style={styles().mainContainer}
      onPress={() => navigation.push('UserProfile', {id: followUser.no})}>
      <View style={styles().contentContainer}>
        <Image style={styles().userImage} source={{uri: followUser.image}} />
        <Text style={fontStyles().nameText}>{followUser.name}</Text>
      </View>
      <View style={styles().contentContainer}>
        {myInfo.data && followUser && myInfo.data.no !== followUser.no && (
          <>
            {myInfo.data.following_user
              .map(following => following.no)
              .includes(followUser.no) && (
              <TouchableOpacity
                style={styles().followingButton}
                onPress={() => follow.mutate(followUser.no)}>
                <Icon name="user-following" size={16} color="#ffffff" />
                <Text style={fontStyles(14).buttonText}>팔로잉</Text>
              </TouchableOpacity>
            )}
            {!myInfo.data.following_user
              .map(following => following.no)
              .includes(followUser.no) && (
              <TouchableOpacity
                style={styles().followButton}
                onPress={() => follow.mutate(followUser.no)}>
                <Icon name="user-follow" size={16} color="#4e5fff" />
                <Text style={fontStyles(14, 'normal', '#4e5fff').buttonText}>
                  팔로우
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default UserFollowItem;
