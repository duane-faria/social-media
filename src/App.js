import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from './navigation';
import { AuthProvider } from './navigation/AuthProvider';
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Navigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
