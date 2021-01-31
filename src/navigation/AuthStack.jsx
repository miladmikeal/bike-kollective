import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/AuthStack/SignIn';
import SignUp from '../screens/AuthStack/SignUp';

const AuthStackNav = createStackNavigator();

const AuthStack = () => (
  <AuthStackNav.Navigator initialRouteName="SignIn" screenOptions={{
    header: () => null
  }}>
    <AuthStackNav.Screen name="SignIn" component={SignIn} />
    <AuthStackNav.Screen name="SignUp" component={SignUp} />
  </AuthStackNav.Navigator>
);

export default AuthStack;