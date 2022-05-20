import React, {useRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import UnityView from '@azesmway/react-native-unity';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import {RootState} from '../modules';
import {getAssetData, changeAsset, buyAsset} from '../api/avatar';
import {useDispatch} from 'react-redux';
import {userActions} from '../modules/user';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

interface MyAsset {
  coin: number;
  avatarNum: number;
  roomNum: number;
  myAvatarList: number[];
  myRoomList: number[];
}

function AvatarScreen() {
  const dispatch = useDispatch();
  // Asset API
  const {data: assetData} = useQuery('AssetData', getAssetData);
  const queryClient = useQueryClient();
  const buy = useMutation(buyAsset, {
    onSuccess: () => {},
    onError: error => {
      console.error(error);
    },
  });
  const onChange = useMutation(changeAsset, {
    onSuccess: () => {
      dispatch(userActions.getMyInfoAsync.request(null));
    },
    onError: error => {
      console.error(error);
    },
  });

  // User data
  const myInfo = useSelector((state: RootState) => state.user.user);

  // Unity init
  const unityRef = useRef();

  // Asset data
  const [myAsset, setMyAasset] = useState<MyAsset>({
    coin: 0,
    avatarNum: 0,
    roomNum: 0,
    myAvatarList: [0],
    myRoomList: [0],
  });

  useEffect(() => {
    if (assetData && myInfo.data) {
      const newAsset: MyAsset = {
        coin: myInfo.data.coin,
        avatarNum: myInfo.data.avatar,
        myAvatarList: assetData.avatar_list,
        roomNum: myInfo.data.room,
        myRoomList: assetData.room_list,
      };
      setMyAasset(newAsset);
    }
  }, [myInfo.data, assetData]);

  // Unity message
  const [message, setMessage] = useState<IMessage>({
    gameObject: 'AvatarList',
    methodName: 'MessageRN',
    message:
      String(myAsset.avatarNum) +
      ' ' +
      String(myAsset.coin) +
      ' ' +
      String(myAsset.roomNum) +
      ' ' +
      '0' +
      ' Room ' +
      '0',
  });

  useEffect(() => {
    const newMessage: IMessage = {
      gameObject: 'AvatarList',
      methodName: 'MessageRN',
      message:
        String(myAsset.avatarNum) +
        ' ' +
        String(myAsset.coin) +
        ' ' +
        String(myAsset.roomNum) +
        ' ' +
        myAsset.myAvatarList.join(' ') +
        ' Room ' +
        myAsset.myRoomList.join(' '),
    };
    setMessage(newMessage);
  }, [myAsset]);

  useEffect(() => {
    setTimeout(() => {
      if (unityRef && unityRef.current) {
        unityRef.current.postMessage(
          message.gameObject,
          message.methodName,
          message.message,
        );
      }
    }, 1000);
  }, [message]);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <UnityView
        ref={unityRef}
        style={{flex: 1}}
        onUnityMessage={result => {
          const msg = result.nativeEvent.message.split(' ');
          if (msg[1] === 'Avatar') {
            if (msg[0] === 'Buy') {
              buy.mutate({no: Number(msg[2]), type: 0});
            }
            setTimeout(() => {
              onChange.mutate({
                avatar: Number(msg[2]),
                room: myAsset.roomNum,
              });
            }, 1500);
          } else {
            if (msg[0] === 'Buy') {
              buy.mutate({no: Number(msg[2]), type: 1});
            }
            setTimeout(() => {
              onChange.mutate({
                avatar: myAsset.avatarNum,
                room: Number(msg[2]),
              });
            }, 1500);
          }
          setTimeout(() => {
            queryClient.invalidateQueries('AssetData');
          }, 1000);
        }}
      />
    </View>
  );
}

export default AvatarScreen;
