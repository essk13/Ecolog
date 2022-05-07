import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import CommunityTab from '../components/Community/MainTab/CommunityTab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FA2E5',
  },
  topMenu: {
    width: '100%',
    height: '10%',
    color: '#ffffff',
    padding: 10,
  },
  topInput: {
    backgroundColor: 'white',
    width: '100%',
  },
  topTitle: {
    color: '#ffffff',
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 10,
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
        />
      </View>
      <CommunityTab keyword={keyword} />
    </View>
  );
}

export default CommunityScreen;
