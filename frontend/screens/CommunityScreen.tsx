import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CommunityTab from '../components/Community/MainTab/CommunityTab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FA2E5',
  },
  topMenu: {
    width: '100%',
    height: '10%',
    color: '#ffffff',
    padding: 10,
  },
  topInput: {
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
  },
  topTitle: {
    color: '#ffffff',
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

function CommunityScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <Text style={styles.topTitle}>커뮤니티</Text>
        <TextInput style={styles.topInput} />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CommunityHome');
        }}>
        <Text>홈으로 이동</Text>
      </TouchableOpacity>
      <CommunityTab />
    </View>
  );
}

export default CommunityScreen;
