import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

export default function ProfileScreen(props) {
  const { logout, user } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.email}</Text>
      <FormButton title="Sair" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
