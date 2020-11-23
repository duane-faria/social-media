import React from 'react';
import auth from '@react-native-firebase/auth';

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
