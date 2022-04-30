import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const styles = (marginL?: any, marginR?: any, justify?: any, align?: any) =>
  StyleSheet.create({
    container: {
      padding: 20,
      justifyContent: justify || 'flex-start',
      alignItems: align || 'flex-start',
    },
    img: {
      width: 300,
      height: 300,
      marginLeft: marginL || 0,
      marginRight: marginR || 0,
      borderRadius: 10,
    },
    btn: {
      width: 220,
      height: 45,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cccccc',
      borderRadius: 10,
    },
  });

const fontStyles = (size?: any, weight?: any, color?: any, align?: any) =>
  StyleSheet.create({
    recordText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
      textAlign: align || 'auto',
    },
  });

function PloggingResultScreen({navigation}: any) {
  return (
    <View>
      <View style={styles().container}>
        <Text style={fontStyles(30, '600', null).recordText}>2022.05.05</Text>
        <Text style={fontStyles(20, '600', null).recordText}>총 거리</Text>
        <Text style={fontStyles(24, '600', null).recordText}>3 km</Text>
        <Text style={fontStyles(18, '600', null).recordText}>칼로리</Text>
        <Text style={fontStyles(20, '600', null).recordText}>578kcal</Text>
        <Text style={fontStyles(18, '600', null).recordText}>경과 시간</Text>
        <Text style={fontStyles(20, '600', null).recordText}>00:01:01</Text>
      </View>
      <ScrollView horizontal={true}>
        <Image
          source={{
            uri: 'https://cdn.imweb.me/upload/S2021011502a2f4eeeb339/99652ab25b094.jpeg',
          }}
          style={styles(40).img}
        />
        <Image
          source={{
            uri: 'https://t1.daumcdn.net/cfile/tistory/2636C73D568B80CF2F',
          }}
          style={styles(30, 40).img}
        />
      </ScrollView>
      <View style={styles(null, null, 'center', 'center').container}>
        <TouchableOpacity onPress={() => {}} style={styles().btn}>
          <Text style={fontStyles(20, '600', null).recordText}>공유하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.popToTop();
          }}
          style={styles().btn}>
          <Text style={fontStyles(20, '600', null).recordText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PloggingResultScreen;
