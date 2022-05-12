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

function ARScreen() {
  const dispatch = useDispatch();
  // Asset API
  const {data: assetData} = useQuery('AssetData', getAssetData);
  const queryClient = useQueryClient();
  const buy = useMutation(buyAsset, {
    onSuccess: () => {},
    onError: error => {
      console.log('buy' + error);
    },
  });
  const onChange = useMutation(changeAsset, {
    onSuccess: () => {
      dispatch(userActions.getMyInfoAsync.request(null));
    },
    onError: error => {
      console.log('change' + error);
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
    console.log(assetData?.avatar_list);
    console.log(myInfo.data?.coin);
    if (assetData && myInfo.data) {
      const newAsset: MyAsset = {
        coin: myInfo.data.coin,
        avatarNum: myInfo.data.avatar,
        myAvatarList: assetData.avatar_list,
        roomNum: myInfo.data.room,
        myRoomList: assetData.room_list,
      };
      setMyAasset(newAsset);
      console.log('Now asset data');
      console.log(assetData);
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
    console.log('set Msg');
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
      console.log('send msg');
      console.log(message.message);
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
          console.log('onUnityMessage', result.nativeEvent.message);
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
            console.log('buy Avatar');
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
            console.log('buy Room');
          }
          setTimeout(() => {
            queryClient.invalidateQueries('AssetData');
          }, 1000);
        }}
      />
    </View>
  );
}

export default ARScreen;
