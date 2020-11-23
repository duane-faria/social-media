import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Alert, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import { AuthContext } from './AuthProvider';
import { post } from '../services/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MessageScreen from '../screens/MessageScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabNav = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={StackHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Mensagens"
      component={StackMessage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="message1" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Perfíl"
      component={StackProfile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const StackHome = () => {
  const { post: postData, setPost, user: User } = React.useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Rede social',
          headerStyle: {
            elevation: 0,
            backgroundColor: 'white',
            height: 40,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#2e64e5',
            fontWeight: 'bold',
            fontFamily: 'RobotoSlab-Bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPostScreen')}>
              <FontAwesome
                name="plus"
                size={20}
                style={{ marginRight: 25 }}
                color="#2e64e5"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        options={({ navigation }) => ({
          title: '',
          headerTransparent: true,
          headerRight: () => (
            <Text
              style={{ marginRight: 20, color: '#2e64e5', fontWeight: 'bold' }}
              onPress={() => {
                post('posts', { user: User.uid, postContent: postData });
                setPost(null);
                navigation.push('Home');
              }}>
              Postar
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const StackProfile = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
const StackMessage = () => {
  return (
    <Stack.Navigator initialRouteName="MessageScreen">
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TabNav;
