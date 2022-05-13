import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Plogging} from '../../../api/plogging';

const styles = () =>
  StyleSheet.create({
    ploggingContainer: {
      alignItems: 'center',
      marginLeft: 20,
    },
    ploggingImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      borderColor: '#ABABAB',
      borderWidth: 0.5,
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

interface PloggingHistoryItemProps {
  navigation: any;
  plogging: Plogging;
}

function PloggingHistoryItem({navigation, plogging}: PloggingHistoryItemProps) {
  const ploggingDate = plogging.ended_at.split(' ')[0].split('-');
  const hour = String(Math.floor(plogging.time / 3600)).padStart(2, '0');
  const min = String(Math.floor((plogging.time % 3600) / 60)).padStart(2, '0');
  const sec = String(plogging.time % 60).padStart(2, '0');

  return (
    <TouchableOpacity
      style={styles().ploggingContainer}
      onPress={() => navigation.navigate('PloggingRecord', {id: plogging.no})}>
      <Image
        source={{uri: plogging.result_img}}
        style={styles().ploggingImage}
      />
      <Text style={fontStyles(14, 'bold', '#000000').normalText}>
        {`${ploggingDate[0]}.${ploggingDate[1]}.${ploggingDate[2]}`}
      </Text>
      <Text
        style={
          fontStyles(9, 'normal', '#000000').normalText
        }>{`${plogging.distance}km / ${hour}:${min}:${sec}`}</Text>
    </TouchableOpacity>
  );
}

export default PloggingHistoryItem;
