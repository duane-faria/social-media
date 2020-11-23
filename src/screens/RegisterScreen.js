import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('campo obrigatório*')
    .email('insira um email válido*'),
  name: Yup.string().required('campo obrigatório*'),
  password: Yup.string()
    .required('campo obrigatório*')
    .min(6, 'mínimo de 6 caracteres'),
  confirmPassword: Yup.string()
    .required('campo obrigatório*')
    .min(6, 'mínimo de 6 caracteres')
    .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais'),
});

export default function RegisterScreen(props) {
  const { register } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/pngwave.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Criar conta</Text>
      <Formik
        initialValues={{
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => {
          register(values);
        }}
        validationSchema={validationSchema}>
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldTouched,
        }) => (
          <>
            <FormInput
              iconType="user"
              placeholderText="Nome"
              autoCorrect={false}
              value={values.name}
              onChangeText={handleChange('name')}
              error={errors.name}
              touched={touched.name}
              onBlur={() => setFieldTouched('name')}
            />
            {errors.name && touched.name && (
              <Text style={{ color: 'tomato' }}>{errors.name}</Text>
            )}
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
            {errors.email && touched.email && (
              <Text style={{ color: 'tomato' }}>{errors.email}</Text>
            )}

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
            {errors.password && touched.password && (
              <Text style={{ color: 'tomato' }}>{errors.password}</Text>
            )}

            <FormInput
              iconType="lock"
              placeholderText="Confirmar senha"
              secureTextEntry={true}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              onBlur={() => setFieldTouched('confirmPassword')}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={{ color: 'tomato' }}>{errors.confirmPassword}</Text>
            )}

            <FormButton title="CADASTRAR" onPress={handleSubmit} />
          </>
        )}
      </Formik>
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
