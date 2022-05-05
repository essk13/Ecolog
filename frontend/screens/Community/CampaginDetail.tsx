import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useQuery} from 'react-query';
import {getCampaignDetail} from '../../api/community';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  image: {
    height: '30%',
    width: '50%',
  },
});

function CampaginDetailScreen({route}: any) {
  const {data: data, isLoading} = useQuery(
    ['campaignDetail', route.params.no, route.params.id],
    () => getCampaignDetail(route.params.no, route.params.id),
  );
  if (!data || isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={{uri: data.image}} style={styles.image} />
      <Text>{data.title}</Text>
      <Text>{data.content}</Text>
      <Text>{data.location}</Text>
    </View>
  );
}

export default CampaginDetailScreen;
