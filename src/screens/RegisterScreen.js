import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

export default function RegisterScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Criar conta</Text>
      <FormInput
        iconType="user"
        placeholderText="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        iconType="lock"
        placeholderText="Senha"
        secureTextEntry={true}
      />
      <FormInput
        iconType="lock"
        placeholderText="Confirmar senha"
        secureTextEntry={true}
      />
      <FormButton title="CADASTRAR" />
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
    fontFamily: 'Kufam-SemiBoldItalic',
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
});
