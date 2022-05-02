import React from 'react';
import {ScrollView, View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    width: '100%',
    aspectRatio: 1,
  },
  item: {
    width: '32.5%',
    marginBottom: '1%',
    borderColor: '#000',
    borderWidth: 0.5,
  },
});

function CommunityFeed() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
            }}
          />
        </View>
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
            }}
          />
        </View>
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
            }}
          />
        </View>
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
            }}
          />
        </View>
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
            }}
          />
        </View>
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default CommunityFeed;
