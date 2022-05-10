import React, {useRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import UnityView from '@azesmway/react-native-unity';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

const coin = 2000;
const avataNum = 1;
const myAvatarList = [0, 1, 3];
const roomNum = 0;
const myRoomList = [0, 1, 2];

function ARScreen() {
  const unityRef = useRef();
  const [init, setInit] = useState<boolean>(false);
  const message: IMessage = {
    gameObject: 'AvatarList',
    methodName: 'MessageRN',
    message:
      String(avataNum) +
      ' ' +
      String(coin) +
      ' ' +
      String(roomNum) +
      ' ' +
      myAvatarList.join(' ') +
      ' Room ' +
      myRoomList.join(' '),
  };

  useEffect(() => {
    console.log(unityRef);
    setInit(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (unityRef && unityRef.current) {
        console.log('send');
        unityRef.current.postMessage(
          message.gameObject,
          message.methodName,
          message.message,
        );
      }
    }, 6000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      {init && (
        <UnityView
          ref={unityRef}
          style={{flex: 1}}
          onUnityMessage={result =>
            console.log('onUnityMessage', result.nativeEvent.message)
          }
        />
      )}
    </View>
  );
}

export default ARScreen;
