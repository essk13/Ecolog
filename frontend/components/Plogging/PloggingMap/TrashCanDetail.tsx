import React, {Dispatch} from 'react';
// Api & Types
import {TrashCan} from '../../../api/plogging';
import {UseMutationResult} from 'react-query';
// Components
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = () =>
  StyleSheet.create({
    backContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    mainContainer: {
      width: 250,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      elevation: 4,
    },
    titleContainer: {
      width: 220,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
    },
    titleImg: {
      width: 28,
      height: 28,
      marginRight: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: '#000000',
    },
    imgBox: {
      width: 220,
      height: 220,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: '#ffffff',
    },
    img: {
      width: 220,
      height: 220,
      borderRadius: 10,
    },
    textContainer: {
      width: 220,
      marginTop: 6,
      marginBottom: 6,
    },
    userText: {
      fontSize: 14,
      color: '#6C6C6C',
    },
    deleteContainer: {
      width: 220,
      alignItems: 'flex-end',
      marginBottom: 15,
    },
    deleteBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText: {
      fontSize: 14,
      color: '#f03e3e',
    },
    cancelContainer: {
      marginBottom: 10,
    },
  });

interface TrashCanDetailProps {
  trashCanData: TrashCan | null;
  setVisibleTrashDetail: Dispatch<boolean>;
  setTrashDetailData: Dispatch<TrashCan | null>;
  deleteTrashCanMutation: UseMutationResult<boolean, unknown, number, unknown>;
}

function TrashCanDetail({
  trashCanData,
  setVisibleTrashDetail,
  setTrashDetailData,
  deleteTrashCanMutation,
}: TrashCanDetailProps) {
  if (!trashCanData || deleteTrashCanMutation.isLoading) {
    return (
      <View style={styles().backContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
      </View>
    );
  }

  return (
    <View style={styles().backContainer}>
      <View style={styles().mainContainer}>
        <View style={styles().titleContainer}>
          <Image
            style={styles().titleImg}
            source={{
              uri: 'https://user-images.githubusercontent.com/87461594/168479817-a7632e66-77b5-4484-9cbe-ca86f0f4345e.png',
            }}
          />
          <Text style={styles().title}>쓰레기통 정보</Text>
        </View>
        <View style={styles().imgBox}>
          <Image
            style={styles().img}
            source={{
              uri: trashCanData.image
                ? trashCanData.image
                : 'https://cdn-icons-png.flaticon.com/512/7438/7438187.png',
            }}
          />
        </View>
        <View style={styles().textContainer}>
          {trashCanData.user.no !== 42 && (
            <Text
              style={
                styles().userText
              }>{`제보자 : ${trashCanData.user.name} (${trashCanData.user.nickname})`}</Text>
          )}
        </View>
        <View style={styles().deleteContainer}>
          <TouchableOpacity
            onPress={() => deleteTrashCanMutation.mutate(trashCanData.no)}
            style={styles().deleteBox}>
            <Icon name="delete-forever" size={20} color="#f03e3e" />
            <Text style={styles().deleteText}>삭제</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles().cancelContainer}
          onPress={() => {
            setVisibleTrashDetail(false);
            setTrashDetailData(null);
          }}>
          <Icon name="cancel" size={44} color={'#5FA2E5'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TrashCanDetail;
