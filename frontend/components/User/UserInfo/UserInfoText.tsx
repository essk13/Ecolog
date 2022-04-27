import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    infoConstainer: {
      marginLeft: 25,
    },
  });

const fontStyles = (size?: number, weight?: any, align?: any, color?: any) =>
  StyleSheet.create({
    infoText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000000',
      textAlign: align || 'auto',
    },
  });

function UserInfoText({title, count}: any) {
  return (
    <View style={styles().infoConstainer}>
      <Text style={fontStyles(16, '600', null, '#4d4d4d').infoText}>
        {title}
      </Text>
      <Text style={fontStyles(15, null, 'right', '#ffffff').infoText}>
        {count}
      </Text>
    </View>
  );
}

export default UserInfoText;
