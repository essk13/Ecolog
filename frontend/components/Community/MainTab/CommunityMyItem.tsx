import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Community} from '../../../api/community';
const styles = StyleSheet.create({
  // 그림자 효과
  myItem: {
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#9e9e9e',
    margin: 10,
  },
  image: {
    height: '40%',
    width: '100%',
    backgroundColor: '#b8b8b8',
  },
  mimage: {
    height: '20%',
    width: '10%',
  },
  content: {
    height: '50%',
    width: '100%',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  tag: {
    backgroundColor: '#b8b8b8',
    borderRadius: 5,
    marginLeft: 'auto',
    paddingLeft: 5,
    paddingRight: 5,
  },
  titleContainer: {
    flexDirection: 'row',
  },
});
interface CommunityItemProps {
  community: Community;
}
function CommunityMyItem({community}: CommunityItemProps) {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CommunityHome', {id: community.no})}>
      <View style={styles.myItem}>
        <Image source={{uri: community.image}} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text>{community.title}</Text>
            <View style={styles.tag}>
              <Text>{community.tag}</Text>
            </View>
          </View>
          <Text>{community.description}</Text>
          <Text>멤버 수 : {community.join_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CommunityMyItem;
