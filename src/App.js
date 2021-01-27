import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import firebase from '../config/firebase.config.js'; // eslint-disable-line

const App = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default registerRootComponent(App);
