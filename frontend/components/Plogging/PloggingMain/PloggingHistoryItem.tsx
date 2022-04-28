import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

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
  plogging: any;
}

function PloggingHistoryItem({plogging}: PloggingHistoryItemProps) {
  return (
    <View style={styles().ploggingContainer}>
      <Image source={{uri: plogging.image}} style={styles().ploggingImage} />
      <Text style={fontStyles(14, 'bold', '#000000').normalText}>
        {plogging.endedAt}
      </Text>
      <Text
        style={
          fontStyles(9, 'normal', '#000000').normalText
        }>{`${plogging.distance}km / ${plogging.time}`}</Text>
    </View>
  );
}

export default PloggingHistoryItem;
