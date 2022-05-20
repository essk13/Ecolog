import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';

const styles = () =>
  StyleSheet.create({
    buttonWrapper: {
      width: 250,
      height: 70,
      borderRadius: 10,
      elevation: 3,
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
  setVisible: any;
}

function PloggingStartButton({
  navigation,
  setVisible,
}: PloggingStartButtonProps) {
  async function requestPermissions() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('PloggingMap');
      } else {
        setVisible(true);
      }
    }
  }

  return (
    <View style={styles().buttonWrapper}>
      <TouchableOpacity
        style={styles().buttonContainer}
        activeOpacity={0.7}
        onPress={requestPermissions}>
        <Image
          source={{
            uri: 'https://user-images.githubusercontent.com/87461594/165669676-c6cc020b-fb73-49c3-9828-cc7e4c3ed1ee.png',
          }}
          style={styles().startImage}
        />
        <Text style={styles().startText}>플로깅 시작</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PloggingStartButton;
