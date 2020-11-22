import React from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen(props) {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/pngwave.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Rede Social</Text>
      <FormInput
        iconType="user"
        placeholderText="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <FormInput
        iconType="lock"
        placeholderText="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <FormButton title="ENTRAR" onPress={() => login(email, password)} />
      <Text
        style={styles.forgotPassword}
        onPress={() => Alert.alert('esqueci')}>
        Esqueceu a senha?
      </Text>
      <Text
        style={[styles.forgotPassword, { marginTop: 60 }]}
        onPress={() => props.navigation.navigate('Register')}>
        Não tem uma conta? Crie aqui
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  logo: {
    width: 120,
    height: 120,
  },
  text: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  forgotPassword: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
    marginTop: 10,
  },
});
