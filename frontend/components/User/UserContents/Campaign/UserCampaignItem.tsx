import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {UserPost} from '../../../../api/user';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../../screens/types';

const styles = () =>
  StyleSheet.create({
    itemContainer: {
      width: '33.3%',
      borderColor: '#ffffff',
      borderWidth: 0.5,
    },
    img: {
      width: '100%',
      aspectRatio: 1,
    },
  });

interface UserCampaignItemProps {
  userPost: UserPost;
}

function UserCampaignItem({userPost}: UserCampaignItemProps) {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <TouchableOpacity
      style={styles().itemContainer}
      onPress={() =>
        navigation.navigate('PostDetail', {
          id: userPost.no,
          no: userPost.community_no,
          type: 3,
        })
      }>
      <Image
        key={userPost.no}
        style={styles().img}
        source={{
          uri: userPost.image,
        }}
      />
    </TouchableOpacity>
  );
}

export default UserCampaignItem;
