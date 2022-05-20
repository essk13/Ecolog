import React from 'react';
import {Text, View, StyleSheet, TextInput, ImageBackground} from 'react-native';
import CommunityHomeTab from '../../components/Community/HomeTab/CommunityHomeTab';
import {useQuery} from 'react-query';
import {getCommunityDetail} from '../../api/community';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topInput: {
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    height: 30,
    padding: 0,
    paddingLeft: 10,
  },
  topTitle: {
    color: '#ffffff',
    alignSelf: 'center',
    margin: 20,
    fontSize: 18,
    fontWeight: '800',
  },
  topMenu: {
    width: '100%',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
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
      <ImageBackground source={{uri: communityDetailData.image}}>
        <View style={styles.topMenu}>
          <Text style={styles.topTitle}>{communityDetailData.title}</Text>
          {/* <TextInput placeholder="검색" style={styles.topInput} /> */}
        </View>
      </ImageBackground>
      <CommunityHomeTab data={communityDetailData} />
    </View>
  );
}

export default CommunityHomeScreen;
