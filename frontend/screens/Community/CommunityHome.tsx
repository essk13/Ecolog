import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import CommunityHomeTab from '../../components/Community/HomeTab/CommunityHomeTab';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FA2E5',
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
  topMenu: {
    width: '100%',
    height: '10%',
    color: '#ffffff',
    padding: 10,
  },
});
function CommunityHomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <Text style={styles.topTitle}>용기내 구미</Text>
        <TextInput style={styles.topInput} />
      </View>
      <CommunityHomeTab />
    </View>
  );
}

export default CommunityHomeScreen;
