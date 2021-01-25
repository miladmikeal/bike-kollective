import React from 'react';
import * as firebase from 'firebase';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import firebaseConfig from '../config/firebase.config.js';



const App = () => {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
};

export default registerRootComponent(App);
