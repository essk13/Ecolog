import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  myListContainer: {
    flexGrow: 0,
    width: '100%',
    minHeight: '100%',
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
const mydata = [
  {title: '구미 일진 박승원팸', member: 5},
  {title: '구미 플로깅 고수모임', member: 50},
  {title: '구미 일진 박승원팸', member: 54},
  {title: '구미 일진 박승원팸', member: 66},
  {title: '구미 일진 박승원팸', member: 12},
  {title: '구미 일진 박승원팸', member: 3},
];
const Myitem = mydata.map((item, index) => {
  return (
    <TouchableOpacity key={index}>
      <View style={styles.myItem}>
        <Text>{item.title}</Text>
        <Text>멤버수 : {item.member}</Text>
      </View>
    </TouchableOpacity>
  );
});

function CommunityMy() {
  return (
    <ScrollView style={styles.myListContainer}>
      <View>{Myitem}</View>
    </ScrollView>
  );
}

export default CommunityMy;
