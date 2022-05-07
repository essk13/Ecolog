import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Community} from '../../../api/community';
const styles = StyleSheet.create({
  myItem: {
    height: 180,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#707070',
  },
  image: {
    height: '50%',
    width: '100%',
  },
  mimage: {
    height: '20%',
    width: '10%',
  },
  content: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
          <Text>{community.title}</Text>
          <Text>{community.join_count}</Text>
          <Image
            source={{uri: community.manager.image}}
            style={styles.mimage}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CommunityMyItem;
