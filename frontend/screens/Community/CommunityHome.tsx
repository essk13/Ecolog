import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import CommunityHomeTab from '../../components/Community/HomeTab/CommunityHomeTab';
import {useQuery} from 'react-query';
import {getCommunityDetail} from '../../api/community';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FA2E5',
  },
  topInput: {
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
  },
  topTitle: {
    color: '#ffffff',
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  topMenu: {
    width: '100%',
    height: '10%',
    color: '#ffffff',
    padding: 10,
  },
});

function CommunityHomeScreen({route}: any) {
  const {data: communityDetailData, isLoading} = useQuery(
    ['CommunityDetail', route.params.id],
    () => getCommunityDetail(route.params.id),
  );
  if (!communityDetailData || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <Text style={styles.topTitle}>{communityDetailData.title}</Text>
        <TextInput style={styles.topInput} />
      </View>
      <CommunityHomeTab data={communityDetailData} />
    </View>
  );
}

export default CommunityHomeScreen;
