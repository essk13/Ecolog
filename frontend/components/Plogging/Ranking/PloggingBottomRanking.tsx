import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
// Components
import PloggingBottomRankItem from './PloggingBottomRankItem';

const styles = () =>
  StyleSheet.create({
    scrollContainer: {
      width: '100%',
      flexGrow: 1,
      marginBottom: 15,
    },
  });

interface DataItem {
  rank: number;
  name: string;
}

interface RankData {
  rankData: DataItem[];
}

function PloggingBottomRanking(props: RankData) {
  const {rankData} = props;
  return (
    <FlatList
      style={styles().scrollContainer}
      data={rankData}
      renderItem={({item}: any) => (
        <PloggingBottomRankItem rank={item.rank} name={item.name} />
      )}
      keyExtractor={item => item.rank.toString()}
    />
  );
}

export default PloggingBottomRanking;
