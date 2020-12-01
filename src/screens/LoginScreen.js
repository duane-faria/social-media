import React from 'react';
import { View, StyleSheet, Image, Text, Alert, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

export default function LoginScreen(props) {
  const { login, loginError } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/pngwave.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Rede Social</Text>
      {loginError && (
        <Text style={{ fontSize: 20, color: 'tomato' }}>
          Login ou senha inválidos.
        </Text>
      )}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          Keyboard.dismiss();

          login(values.email, values.password);
        }}
        validationSchema={validationSchema}>
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldTouched,
          resetForm,
        }) => (
          <>
            <FormInput
              iconType="user"
              placeholderText="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={values.email}
              onChangeText={handleChange('email')}
              error={errors.email}
              touched={touched.email}
              onBlur={() => setFieldTouched('email')}
            />
            <FormInput
              iconType="lock"
              placeholderText="Senha"
              secureTextEntry={true}
              value={values.password}
              onChangeText={handleChange('password')}
              error={errors.password}
              touched={touched.password}
              onBlur={() => setFieldTouched('password')}
            />
            <FormButton title="ENTRAR" onPress={handleSubmit} />
            <Text
              style={styles.forgotPassword}
              onPress={() => Alert.alert('esqueci')}>
              Esqueceu a senha?
            </Text>
            <Text
              style={[styles.forgotPassword, { marginTop: 60 }]}
              onPress={() => {
                resetForm();
                props.navigation.navigate('Register');
              }}>
              Não tem uma conta? Crie aqui
            </Text>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fff',
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
