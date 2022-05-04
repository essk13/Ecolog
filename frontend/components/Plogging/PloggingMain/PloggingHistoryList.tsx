import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../modules';
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

interface MoreImageProps {
  navigation: any;
}

function MoreImage({navigation}: MoreImageProps) {
  return (
    <TouchableOpacity
      style={styles().moreContainer}
      onPress={() => navigation.navigate('User')}>
      <Image
        source={{
          uri: 'https://cdn0.iconfinder.com/data/icons/modagraphica-interface/30/more-512.png',
        }}
        style={styles().moreImage}
      />
      <Text style={fontStyles(14, 'bold', '#000000').normalText}>더보기</Text>
    </TouchableOpacity>
  );
}

interface PloggingHistoryListProps {
  navigation: any;
}

function PloggingHistoryList({navigation}: PloggingHistoryListProps) {
  const ploggingList = useSelector(
    (state: RootState) => state.plogging.ploggingList,
  );

  return (
    <FlatList
      style={styles().ploggingListContainer}
      horizontal={true}
      data={ploggingList.data?.slice(-5).reverse()}
      renderItem={({item}: any) => (
        <PloggingHistoryItem navigation={navigation} plogging={item} />
      )}
      ListFooterComponent={() => <MoreImage navigation={navigation} />}
      keyExtractor={item => item.no.toString()}
    />
  );
}

export default PloggingHistoryList;
