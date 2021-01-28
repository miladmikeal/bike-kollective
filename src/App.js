import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import AuthStack from './navigation/AuthStack';
import firebaseConfig from '../config/firebase.config.js';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  if (!firebase.apps.length) {
    // eslint-disable-next-line no-console
    console.log('Connected with Firebase');
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  });

  return (
    <NavigationContainer>
      {currentUser !== null ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default registerRootComponent(App);
