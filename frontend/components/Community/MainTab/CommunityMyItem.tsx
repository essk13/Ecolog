import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Community} from '../../../api/community';
const styles = StyleSheet.create({
  // 그림자 효과
  myItem: {
    height: 150,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#cecece',
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: '#bbbbbb',
  },
  ItemContent: {
    marginLeft: 'auto',
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  commuTextTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  commuTextCount: {
    color: '#b6b6b6',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 'auto',
  },
  commuTextTag: {
    color: '#ffffff',
    fontSize: 13,
  },
  commuTextdes: {
    color: '#c9c9c9',
    fontSize: 13,
    fontWeight: '600',
  },
  commuTagBox: {
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 'auto',
    marginLeft: 'auto',
    borderRadius: 5,
    backgroundColor: 'rgba(97, 97, 97,0.5)',
  },
});
interface CommunityItemProps {
  community: Community;
}
function CommunityMyItem({community}: CommunityItemProps) {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CommunityHome', {id: community.no})}
      style={styles.myItem}>
      <ImageBackground
        blurRadius={5}
        source={{uri: community.image}}
        style={styles.image}>
        <View style={styles.ItemContent}>
          <View style={{flexDirection: 'row', height: '20%'}}>
            <Text style={styles.commuTextTitle}>{community.title}</Text>
            <Text style={styles.commuTextCount}>
              아이콘 {community.join_count}
            </Text>
          </View>
          <View style={{flexDirection: 'row', height: '80%', paddingTop: 10}}>
            <Text style={styles.commuTextdes}>{community.description}</Text>
            <View style={styles.commuTagBox}>
              <Text style={styles.commuTextTag}>#{community.tag}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default CommunityMyItem;
