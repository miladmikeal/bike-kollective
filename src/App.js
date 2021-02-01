/* eslint-disable no-console */
import React from 'react';
import * as firebase from 'firebase';
import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import Routes from './Routes';

import firebaseConfig from '../config/firebase.config.js';
import { AuthProvider } from './context/AuthProvider';

// Something is setting massive timeouts
LogBox.ignoreLogs(['Setting a timer']);

const App = () => {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default registerRootComponent(App);
