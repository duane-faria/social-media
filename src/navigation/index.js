import React from 'react';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import { AuthContext } from './AuthProvider';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import * as firebase from '../services/firebase';
const Navigator = () => {
  const { user, setUser } = React.useContext(AuthContext);

  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    const onAuthStateChanged = async (User) => {
      if (User) {
        const u = await firebase.get(`users/${User.uid}`);
        User.name = u.name;
        User.profileImage = u.profileImage;
      }
      setUser(User);
      if (initializing) {
        setInitializing(false);
      }
    };
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, [setUser, initializing, user]);

  if (initializing) {
    return null;
  }
  console.log;
  return user ? <AppNavigation /> : <AuthNavigation />;
};
export default Navigator;
