import React from 'react';
// Components
import {StyleSheet, Text, View} from 'react-native';

const styles = () =>
  StyleSheet.create({
    backContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    saveTCTipCircle: {
      position: 'absolute',
      top: 17,
      left: 17,
      width: 51,
      height: 51,
      borderRadius: 25.5,
      borderWidth: 3,
      borderColor: '#5FA2E5',
    },
    visibleTCTipCircle: {
      position: 'absolute',
      bottom: '33%',
      right: 17,
      marginBottom: -3,
      width: 51,
      height: 51,
      borderRadius: 25.5,
      borderWidth: 3,
      borderColor: '#5FA2E5',
    },
    finishTipCircle: {
      position: 'absolute',
      marginTop: -44,
      width: 88,
      height: 88,
      borderRadius: 44,
      borderWidth: 4,
      borderColor: '#5FA2E5',
    },
    saveTCTipBox: {
      position: 'absolute',
      top: 20,
      left: 80,
      maxWidth: 260,
      minHeight: 50,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      padding: 8,
      elevation: 5,
    },
    visibleTCTipBox: {
      position: 'absolute',
      bottom: '33%',
      right: 20,
      marginBottom: 60,
      maxWidth: 260,
      minHeight: 50,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      padding: 8,
      elevation: 5,
    },
    finishTipContainer: {
      position: 'absolute',
      top: '70%',
      width: '100%',
      flex: 1,
      alignItems: 'center',
    },
    finishTipBox: {
      maxWidth: 300,
      minHeight: 60,
      marginTop: 50,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      padding: 8,
      elevation: 5,
    },
    titleText: {
      fontSize: 18,
      color: '#5FA2E5',
      fontWeight: '600',
      marginBottom: 2,
    },
    normalText: {
      fontSize: 15,
      color: '#000000',
    },
  });

function PloggingTip() {
  return (
    <View style={styles().backContainer}>
      <View style={styles().saveTCTipBox}>
        <Text style={styles().titleText}>쓰레기통 등록</Text>
        <Text style={styles().normalText}>
          쓰레기통을 촬영하여 지도에 쓰레기통 정보를 등록할 수 있습니다.
        </Text>
      </View>
      <View style={styles().visibleTCTipBox}>
        <Text style={styles().titleText}>주변 쓰레기통 표시</Text>
        <Text style={styles().normalText}>
          반경 1km 내에 있는 쓰레기통을 지도에 표시할 수 있습니다.
        </Text>
      </View>
      <View style={styles().finishTipContainer}>
        <View style={styles().finishTipBox}>
          <Text style={styles().titleText}>플로깅 완료</Text>
          <Text style={styles().normalText}>
            플로깅을 완료한 후 인증사진을 촬영하여 경로와 함께 플로깅 기록을
            저장할 수 있습니다.
          </Text>
        </View>
        <View style={styles().finishTipCircle}></View>
      </View>
      <View style={styles().saveTCTipCircle}></View>
      <View style={styles().visibleTCTipCircle}></View>
    </View>
  );
}

export default PloggingTip;
