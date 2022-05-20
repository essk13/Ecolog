import React from 'react';
// Hooks
import {useSelector} from 'react-redux';
import {useQuery} from 'react-query';
// Api & Types
import {getMyRanking} from '../../../api/plogging';
import {RootState} from '../../../modules';
// Components
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, Colors} from 'react-native-paper';

const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: '#ABABAB',
      borderWidth: 0.5,
      backgroundColor: '#ffffff',
      elevation: 3,
    },
    imageContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

const fontStyles = (size?: number, weight?: any, color?: string) =>
  StyleSheet.create({
    normalText: {
      fontSize: size || 16,
      fontWeight: weight || 'normal',
      color: color || '#000000',
      marginHorizontal: 5,
    },
  });

function PloggingRankingInfo() {
  const myInfo = useSelector((state: RootState) => state.user.user);
  const myRank = useQuery('myRank', () => getMyRanking());

  return (
    <View style={styles().container}>
      {(myRank.isFetching || !myRank.data) && (
        <ActivityIndicator animating={true} color={Colors.blueA100} />
      )}
      {!myRank.isFetching && myRank.data && (
        <>
          <Text style={fontStyles(14, 'bold', '#000000').normalText}>{`${
            myRank.data?.ranking ? myRank.data?.ranking : ' - '
          }위`}</Text>
          <LinearGradient
            colors={['#00F260', '#0575E6']}
            style={styles().imageContainer}>
            <Avatar.Image
              size={32}
              source={{
                uri: myInfo.data?.image,
              }}
            />
          </LinearGradient>
          <Text style={fontStyles(12, 'normal', '#ABABAB').normalText}>
            {`${myRank.data.cnt}회 / ${
              Math.round(myRank.data.dist * 100) / 100
            }km`}
          </Text>
        </>
      )}
    </View>
  );
}

export default PloggingRankingInfo;
