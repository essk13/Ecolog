import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    color: '#ffffff',
  },
  topMenu: {
    backgroundColor: '#5FA2E5',
    width: '100%',
    height: '15%',
    color: '#ffffff',
    padding: 20,
  },
  topInput: {
    backgroundColor: 'white',
    width: '100%',
    height: '20%',
  },
  topTitle: {
    color: '#ffffff',
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  mainMenu: {
    backgroundColor: '#2080c0',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 20,
  },
  myCommunity: {
    backgroundColor: '#753434',
    width: '100%',
    height: '40%',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
  },
  scrollView2: {
    width: '100%',
  },
  campaign: {
    width: '25%',
    height: '10%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

function CommunityScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <Text style={styles.topTitle}>커뮤니티</Text>
        <TextInput style={styles.topInput} />
      </View>
      <View style={styles.mainMenu}>
        <Text>인기 캠페인</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          <View style={styles.campaign}>
            <Text>용기내 챌린지</Text>
          </View>
          <View style={styles.campaign}>
            <Text>용기내 챌린지</Text>
          </View>
          <View style={styles.campaign}>
            <Text>용기내 챌린지</Text>
          </View>
          <View style={styles.campaign}>
            <Text>용기내 챌린지</Text>
          </View>
          <View style={styles.campaign}>
            <Text>용기내 챌린지</Text>
          </View>
        </ScrollView>
        <Text>인기 커뮤니티</Text>
        <Text>내 커뮤니티</Text>
        <ScrollView style={styles.scrollView2}>
          <View style={styles.myCommunity}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CommunityHome');
              }}>
              <Text>Go to CommunityHome</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myCommunity}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CommunityHome');
              }}>
              <Text>Go to CommunityHome</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myCommunity}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CommunityHome');
              }}>
              <Text>Go to CommunityHome</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.myCommunity}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CommunityHome');
              }}>
              <Text>Go to CommunityHome</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default CommunityScreen;
