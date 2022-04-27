import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    itemContainer: {
      width: '32.5%',
      marginBottom: '1%',
      borderColor: '#000',
      borderWidth: 0.5,
    },
    img: {
      width: '100%',
      aspectRatio: 1,
    },
  });

function UserCampaignItem(notUse: any) {
  return (
    <View style={styles().itemContainer}>
      <Image
        key={notUse}
        style={styles().img}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
        }}
      />
    </View>
  );
}

export default UserCampaignItem;
