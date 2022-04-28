import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    buttonWrapper: {
      width: 250,
      height: 70,
      borderRadius: 10,
      elevation: 2,
      backgroundColor: '#ffffff',
    },
    buttonContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    startImage: {
      width: 32,
      height: 32,
      marginRight: 16,
    },
    startText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
    },
  });

interface PloggingStartButtonProps {
  navigation: any;
}

function PloggingStartButton({navigation}: PloggingStartButtonProps) {
  return (
    <View style={styles().buttonWrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('PloggingMap');
        }}>
        <View style={styles().buttonContainer}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/87461594/165669676-c6cc020b-fb73-49c3-9828-cc7e4c3ed1ee.png',
            }}
            style={styles().startImage}
          />
          <Text style={styles().startText}>플로깅 시작</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default PloggingStartButton;
