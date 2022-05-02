import React from 'react';
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 20,
    height: '100%',
  },
  contentContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    minHeight: '100%',
    marginTop: 40,
  },
  FreeListItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 50,
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  img: {aspectRatio: 1, marginLeft: 'auto'},
});

const FreeListItem = () => {
  return (
    <View style={styles.FreeListItem}>
      <View>
        <Text>가입했습니다!</Text>
        <Text>이수환</Text>
      </View>
      <Image
        style={styles.img}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
        }}
      />
    </View>
  );
};

function CommunityFree() {
  return (
    <View style={styles.Container}>
      <Text>자유 게시판</Text>
      <ScrollView style={styles.contentContainer}>
        <FreeListItem />
        <FreeListItem />
        <FreeListItem />
        <FreeListItem />
        <FreeListItem />
        <FreeListItem />
        <FreeListItem />
        <FreeListItem />
      </ScrollView>
    </View>
  );
}

export default CommunityFree;
