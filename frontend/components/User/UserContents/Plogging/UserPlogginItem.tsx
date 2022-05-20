import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainTabNavigationProp} from '../../../../screens/types';
import {Plogging} from '../../../../api/plogging';

const styles = (ratio?: any) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      width: '90%',
      height: 85,
      marginTop: 15,
      padding: 8,
      borderRadius: 5,
      borderColor: '#000',
      borderWidth: 0.5,
      backgroundColor: '#FFF',
      elevation: 5,
    },
    img: {
      height: '100%',
      aspectRatio: ratio || 1,
      borderRadius: 3,
    },
    textContainer: {
      width: '38.5%',
      marginHorizontal: 10,
    },
  });

const fontStyles = (size?: any, weight?: any, color?: any) =>
  StyleSheet.create({
    itemText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#4d4d4d',
    },
  });

interface UserPloggingItemProps {
  ploggingData: Plogging;
}

function UserPloggingItem({ploggingData}: UserPloggingItemProps) {
  const navigation = useNavigation<MainTabNavigationProp>();
  const ended = ploggingData.ended_at.split(' ');
  const ploggingDate = ended[0];
  let hour, min, sec;
  const minCheck = Math.floor(ploggingData.time / 60);
  hour = Math.floor(ploggingData.time / 3600);
  min = minCheck % 60;
  sec = ploggingData.time % 60;

  return (
    <TouchableOpacity
      style={styles().itemContainer}
      onPress={() =>
        navigation.navigate('PloggingRecord', {id: ploggingData.no})
      }>
      <Image
        style={styles().img}
        source={{
          uri: ploggingData.result_img,
        }}
      />
      <View style={styles().textContainer}>
        <Text style={fontStyles(16, 'bold', '#000000').itemText}>
          {ploggingDate}
        </Text>
        <Text style={fontStyles(12).itemText}>
          {Math.round(ploggingData.distance * 100) / 100}km /{' '}
          {ploggingData.calories}kcal
        </Text>
        <Text style={fontStyles(12).itemText}>
          {hour > 0 && <>{hour}시간 </>}
          {min > 0 && <>{min}분 </>}
          {sec > 0 && <>{sec}초</>}
        </Text>
      </View>
      <Image
        style={styles(1.5).img}
        source={{
          uri: ploggingData.route_img,
        }}
      />
    </TouchableOpacity>
  );
}

export default UserPloggingItem;
