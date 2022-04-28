import React from 'react';
import {FlatList, View, Image, Text, StyleSheet} from 'react-native';
// Components
import PloggingHistoryItem from './PloggingHistoryItem';

const styles = () =>
  StyleSheet.create({
    listContainer: {
      flexDirection: 'row',
      height: '100%',
    },
    ploggingListContainer: {
      height: '100%',
    },
    moreContainer: {
      height: '100%',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    moreImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ABABAB',
      marginBottom: 4,
    },
  });

const fontStyles = (size?: number, weight?: any, color?: string) =>
  StyleSheet.create({
    normalText: {
      fontSize: size || 16,
      fontWeight: weight || 'normal',
      color: color || '#000000',
    },
  });

interface PloggingHistoryListProps {
  navigation: any;
}

function MoreImage() {
  return (
    <View style={styles().moreContainer}>
      <Image
        source={{
          uri: 'https://cdn0.iconfinder.com/data/icons/modagraphica-interface/30/more-512.png',
        }}
        style={styles().moreImage}
      />
      <Text style={fontStyles(14, 'bold', '#000000').normalText}>더보기</Text>
    </View>
  );
}

function PloggingHistoryList({navigation}: PloggingHistoryListProps) {
  const ploggingList = [
    {
      id: 0,
      endedAt: '2099.04.19',
      image:
        'https://cdn.imweb.me/upload/S2021011502a2f4eeeb339/99652ab25b094.jpeg',
      time: '00:01:01',
      distance: 0.05,
    },
    {
      id: 1,
      endedAt: '2099.04.19',
      image:
        'https://cdn.imweb.me/upload/S2021011502a2f4eeeb339/99652ab25b094.jpeg',
      time: '00:01:01',
      distance: 0.05,
    },
    {
      id: 2,
      endedAt: '2099.04.19',
      image:
        'https://cdn.imweb.me/upload/S2021011502a2f4eeeb339/99652ab25b094.jpeg',
      time: '00:01:01',
      distance: 0.05,
    },
    {
      id: 3,
      endedAt: '2099.04.19',
      image:
        'https://cdn.imweb.me/upload/S2021011502a2f4eeeb339/99652ab25b094.jpeg',
      time: '00:01:01',
      distance: 0.05,
    },
  ];

  return (
    <FlatList
      style={styles().ploggingListContainer}
      horizontal={true}
      data={ploggingList}
      renderItem={({item}: any) => (
        <PloggingHistoryItem navigation={navigation} plogging={item} />
      )}
      ListFooterComponent={() => <MoreImage />}
      keyExtractor={item => item.id.toString()}
    />
  );
}

export default PloggingHistoryList;
