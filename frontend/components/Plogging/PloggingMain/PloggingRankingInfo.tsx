import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '40%',
      height: '70%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: '#ABABAB',
      borderWidth: 1,
    },
    imageContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00f260',
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

function PloggingRankingInfo() {
  return (
    <View style={styles().container}>
      <Text style={fontStyles(14, 'bold', '#000000').normalText}>5위</Text>
      <View style={styles().imageContainer}>
        <Avatar.Image
          size={32}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
          }}
        />
      </View>
      <Text style={fontStyles(12, 'normal', '#ABABAB').normalText}>
        92회/15km
      </Text>
    </View>
  );
}

export default PloggingRankingInfo;
