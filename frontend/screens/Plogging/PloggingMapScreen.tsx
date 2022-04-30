import React from 'react';
import {Text, View, Platform, TouchableHighlight} from 'react-native';
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

const imagePickerOption: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  // includeBase64: Platform.OS === 'android',
};

function PloggingMapScreen({navigation}: any) {
  const onPickImage = (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      return;
    }
    console.log(res);
    navigation.navigate('PloggingResult', {res});
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  return (
    <View>
      <Text>This is PloggingMap</Text>
      <TouchableHighlight onPress={() => onLaunchCamera()} underlayColor="red">
        <Text>Go to Result</Text>
      </TouchableHighlight>
    </View>
  );
}

export default PloggingMapScreen;
