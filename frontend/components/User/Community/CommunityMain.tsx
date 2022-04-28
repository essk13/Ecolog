import React from 'react';
import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  img: {
    width: '100%',
    aspectRatio: 0.75,
  },
  campaign: {
    width: '25%',
    height: '10%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  scrollView: {
    width: '100%',
  },
});

function CommunityMain() {
  return (
    <View style={styles.contentContainer}>
      <Text>인기 캠페인</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.campaign}>
          <Text>sdfsdf</Text>
        </View>
        <View style={styles.campaign}>
          <Text>sdfsdf</Text>
        </View>
        <View style={styles.campaign}>
          <Text>sdfsdf</Text>
        </View>
        <View style={styles.campaign}>
          <Text>sdfsdf</Text>
        </View>
      </ScrollView>
      <Text>인기 커뮤니티</Text>
      <Text>내 커뮤니티</Text>
    </View>
  );
}

export default CommunityMain;
