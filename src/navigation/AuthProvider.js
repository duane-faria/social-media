import React from 'react';
import auth from '@react-native-firebase/auth';

import * as firebase from '../services/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loginError, setLoginError] = React.useState(false);
  const [post, setPost] = React.useState(null);

  async function login(email, password) {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setLoginError(false);
    } catch (e) {
      console.log(`error in login ${e}`);
      setLoginError(true);
    }
  }

  async function register(userReg) {
    try {
      const { email, password, name } = userReg;
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      firebase.postWithRef(`/users/${user.uid}`, { id: user.uid, name });
    } catch (e) {
      console.log(`error in register ${e}`);
    }
  }

  async function logout() {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(`error in logout ${e}`);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        loginError,
        register,
        logout,
        post,
        setPost,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
