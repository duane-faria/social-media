import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from './navigation';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Navigator />
      </NavigationContainer>
    </>
  );
};

export default App;
