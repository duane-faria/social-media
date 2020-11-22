import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen(props) {
  const { logout } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Home carai</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
