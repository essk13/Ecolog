import React, {useEffect, useState} from 'react';
// Hooks
import {useMutation} from 'react-query';
// Api & Types
import {
  getFollowRanking,
  getRegionRanking,
  getTimeRanking,
  PloggingRankList,
} from '../../api/plogging';
// Components
import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import PloggingTopRanking from '../../components/Plogging/Ranking/PloggingTopRanking';
import PloggingBottomRanking from '../../components/Plogging/Ranking/PloggingBottomRanking';
import DropDownPicker from 'react-native-dropdown-picker';

const styles = (color?: any, marginT?: any, marginL?: any) =>
  StyleSheet.create({
    mainContainer: {
      marginVertical: 20,
      height: '100%',
    },
    imgContainer: {
      width: '100%',
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    headerImg: {
      width: '100%',
      aspectRatio: 2.5,
      marginBottom: 15,
      borderRadius: 10,
    },
    titleContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      paddingRight: 10,
    },
    titleImg: {
      width: 30,
      height: 30,
      marginRight: 12,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    btnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 10,
    },
    btnItem: {
      width: 50,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: marginL || 0,
      backgroundColor: color || '#d4d4d4',
      borderRadius: 10,
      elevation: 2,
    },
  });

const fontStyles = (size?: any, weight?: any, color?: any) =>
  StyleSheet.create({
    rankText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
    },
  });

function PloggingRankingScreen() {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownItems, setDropdownItems] = useState<
    Array<{label: string; value: string}>
  >([
    {label: '전체', value: 'all'},
    {label: '주간', value: 'week'},
    {label: '월간', value: 'month'},
  ]);
  const [rankData, setRankData] = useState<PloggingRankList>([]);
  const [rankType, setRankType] = useState<string>('time');
  const [periodType, setPeriodType] = useState<string>('all');
  const {mutate: getTimeRank} = useMutation(getTimeRanking, {
    onSuccess: data => {
      setRankData(data);
    },
    onError: error => {
      console.error(error);
    },
  });
  const {mutate: getFollowRank} = useMutation(getFollowRanking, {
    onSuccess: data => {
      setRankData(data);
    },
    onError: error => {
      console.error(error);
    },
  });
  const {mutate: getRegionRank} = useMutation(getRegionRanking, {
    onSuccess: data => {
      setRankData(data);
    },
    onError: error => {
      console.error(error);
    },
  });

  const [topRankData, setTopRankData] = useState<PloggingRankList>([]);
  const [bottomRankData, setBottomRankData] = useState<PloggingRankList>([]);

  useEffect(() => {
    if (rankType === 'time') {
      getTimeRank(periodType);
    } else if (rankType === 'follow') {
      getFollowRank(periodType);
    } else {
      getRegionRank(periodType);
    }
  }, [rankType, periodType]);

  useEffect(() => {
    setTopRankData([...rankData].slice(0, 3));
    setBottomRankData([...rankData].slice(3));
  }, [rankData]);

  return (
    <View style={styles().mainContainer}>
      <View style={styles().imgContainer}>
        <Image
          style={styles().headerImg}
          source={{
            uri: 'https://cdn.itbiznews.com/news/photo/202111/55365_50621_652.png',
          }}
        />
      </View>
      <View style={styles().titleContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1603/1603847.png',
          }}
          style={styles().titleImg}
        />
        <Text style={fontStyles(22, '600').rankText}>플로거 랭킹</Text>
      </View>

      <View style={styles().filterContainer}>
        <View style={styles().btnContainer}>
          <TouchableOpacity
            style={styles(rankType === 'time' ? '#bdd7ff' : null).btnItem}
            onPress={() => setRankType('time')}>
            <Text style={fontStyles(null, '400').rankText}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              styles(rankType === 'follow' ? '#bdd7ff' : null, null, 10).btnItem
            }
            onPress={() => setRankType('follow')}>
            <Text style={fontStyles(null, '400').rankText}>친구</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              styles(rankType === 'region' ? '#bdd7ff' : null, null, 10).btnItem
            }
            onPress={() => setRankType('region')}>
            <Text style={fontStyles(null, '400').rankText}>지역</Text>
          </TouchableOpacity>
        </View>
        <DropDownPicker
          containerStyle={{width: 80, height: 40}}
          open={dropdownOpen}
          value={periodType}
          items={dropdownItems}
          setOpen={setDropdownOpen}
          setValue={setPeriodType}
          setItems={setDropdownItems}
        />
      </View>
      <PloggingTopRanking rankDataList={topRankData} />
      <PloggingBottomRanking rankDataList={bottomRankData} />
    </View>
  );
}

export default PloggingRankingScreen;
