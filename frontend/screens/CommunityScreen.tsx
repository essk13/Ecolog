import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  ScrollView,
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    color: '#ffffff',
    padding: 20,
  },
  topInput: {
    backgroundColor: 'white',
    width: '100%',
    height: '20%',
    borderRadius: 5,
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
      <View>
        <Text>인기 캠페인</Text>
      </View>
      <View>
        <Text>인기 커뮤니티</Text>
      </View>
      <ScrollView>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('CommunityHome');
          }}
          underlayColor="red">
          <Text>Go to CommunityHome</Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
}

export default CommunityScreen;
