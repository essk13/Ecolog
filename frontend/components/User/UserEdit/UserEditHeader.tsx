import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {RootStackNavigationProp} from '../../../screens/types';

const styles = (
  width?: any,
  height?: any,
  justify?: any,
  align?: any,
  flex?: any,
) =>
  StyleSheet.create({
    container: {
      width: width || '100%',
      height: height || '100%',
      justifyContent: justify || 'flex-start',
      alignItems: align || 'flex-start',
      flexDirection: flex || 'column',
      backgroundColor: '#5FA2E5',
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

function UserEditHeader() {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles('100%', 60, null, null, 'row').container}>
      <View style={styles('16%', '100%', 'center', 'center').container}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="left" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles('68%', '100%', 'center', 'center').container}>
        <Text style={fontStyles(20, 'bold', '#ffffff').normalText}>
          내 정보 수정
        </Text>
      </View>
    </View>
  );
}

export default UserEditHeader;
