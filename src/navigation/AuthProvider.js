import React from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  async function login(email, password) {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(`error in login ${e}`);
    }
  }

  async function register(email, password) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
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
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
