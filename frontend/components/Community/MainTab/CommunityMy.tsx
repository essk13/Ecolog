import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  myListContainer: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  myItem: {
    height: 150,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
  },
});
const myItem = ({item}: any) => {
  return (
    <TouchableOpacity>
      <View style={styles.myItem}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );
};
function CommunityMy() {
  const mydata = [
    '커뮤니티1',
    '커뮤니티12',
    '커뮤니티15',
    '커뮤니티17',
    '커뮤니티81',
  ];
  return (
    <FlatList
      style={styles.myListContainer}
      data={mydata}
      renderItem={myItem}
    />
  );
}

export default CommunityMy;
