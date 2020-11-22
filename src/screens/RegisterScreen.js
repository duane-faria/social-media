import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';
export default function RegisterScreen(props) {
  const { register } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confPassword, setConfPassword] = React.useState();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/pngwave.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Criar conta</Text>
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
      <FormInput
        iconType="lock"
        placeholderText="Confirmar senha"
        secureTextEntry={true}
        value={confPassword}
        onChangeText={(text) => setConfPassword(text)}
      />
      <FormButton
        title="CADASTRAR"
        onPress={() => {
          console.log(email, password);
          // return;
          register(email, password);
        }}
      />
      <View style={styles.terms}>
        <Text style={{ color: 'grey' }}>Ao registrar você aceita os </Text>
        <Text style={{ color: '#e88832' }}>termos de uso</Text>
        <Text style={{ color: 'grey' }}> e </Text>
        <Text style={{ color: '#e88832' }}>política de privacidade.</Text>
      </View>
      <Text
        style={[styles.haveAccount, { marginTop: 60 }]}
        onPress={() => props.navigation.navigate('Login')}>
        Tem uma conta? Entrar
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
  text: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  terms: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  haveAccount: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
    marginTop: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
