import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {PloggingRankList} from '../../../api/plogging';
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

interface PloggingBottomRankingProps {
  rankDataList: PloggingRankList;
}

function PloggingBottomRanking({rankDataList}: PloggingBottomRankingProps) {
  return (
    <FlatList
      style={styles().scrollContainer}
      data={rankDataList}
      renderItem={({item, index}: any) => (
        <PloggingBottomRankItem rank={index + 4} rankData={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default PloggingBottomRanking;
