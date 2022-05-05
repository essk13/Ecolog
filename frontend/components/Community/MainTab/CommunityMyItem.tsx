import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Community} from '../../../api/community';
const styles = StyleSheet.create({
  myItem: {
    height: 150,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
  },
  image: {
    height: '30%',
    width: '50%',
  },
  mimage: {
    height: '20%',
    width: '10%',
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
        <Text>{community.title}</Text>
        <Text>{community.no}</Text>
        <Image source={{uri: community.manager.image}} style={styles.mimage} />
      </View>
    </TouchableOpacity>
  );
}

export default CommunityMyItem;
