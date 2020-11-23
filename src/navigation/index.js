import React from 'react';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import { AuthContext } from './AuthProvider';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const Navigator = () => {
  const { user, setUser } = React.useContext(AuthContext);

  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    const onAuthStateChanged = (User) => {
      setUser(User);
      if (initializing) {
        setInitializing(false);
      }
    };
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, [setUser, initializing]);

  if (initializing) {
    return null;
  }

  return user ? <AppNavigation /> : <AuthNavigation />;
};
export default Navigator;
