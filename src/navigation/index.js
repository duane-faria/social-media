import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import { AuthContext } from './AuthProvider';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

// const Stack = createStackNavigator();
// const AuthNav = () => (
//   <Stack.Navigator initialRouteName="Login">
//     <Stack.Screen
//       name="Login"
//       component={LoginScreen}
//       options={{
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="Register"
//       component={RegisterScreen}
//       options={{
//         headerShown: false,
//       }}
//     />
//   </Stack.Navigator>
// );

// const StackLogged = createStackNavigator();
// const AppNav = () => (
//   <StackLogged.Navigator initialRouteName="Home">
//     <StackLogged.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         headerShown: false,
//       }}
//     />
//   </StackLogged.Navigator>
// );

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
