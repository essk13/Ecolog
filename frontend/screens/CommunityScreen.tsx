import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import CommunityTab from '../components/Community/MainTab/CommunityTab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(95, 162, 229)',
  },
  topMenu: {
    width: '100%',
    padding: 10,
  },
  topTitle: {
    color: '#ffffff',
    alignSelf: 'center',
    marginBottom: 10,
  },
  topInput: {
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    height: 30,
    padding: 0,
    paddingLeft: 10,
    color: '#000000',
  },
});

function CommunityScreen() {
  const [keyword, setKeyword] = React.useState<string>('');
  const [inputData, setInputData] = React.useState<string>('');
  const keySubmit = () => {
    setKeyword(inputData);
    setInputData('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <Text style={styles.topTitle}>커뮤니티</Text>
        <TextInput
          placeholder="검색"
          onChangeText={setInputData}
          value={inputData}
          style={styles.topInput}
          clearTextOnFocus={true}
          onSubmitEditing={keySubmit}
          returnKeyType="done"
        />
      </View>
      <CommunityTab keyword={keyword} />
    </View>
  );
}

export default CommunityScreen;
