import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

function UserScreen() {
  return (
    <View>
      <Text>User</Text>
      <TouchableHighlight onPress={() => {}} underlayColor="red">
        <Text>This is Red Highlight Button</Text>
      </TouchableHighlight>
    </View>
  );
}

export default UserScreen;
