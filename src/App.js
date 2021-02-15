/* eslint-disable no-else-return */
/* eslint-disable global-require */
/* eslint-disable no-console */
import React, { useState } from 'react';
import * as firebase from 'firebase';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { LogBox } from 'react-native';
import Routes from './Routes';

import firebaseConfig from '../config/firebase.config.js';
import { AuthProvider } from './context/AuthProvider';

// Something is setting massive timeouts
LogBox.ignoreLogs(['Setting a timer']);

const getFonts = () => Font.loadAsync({
  'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
  'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
});

const App = () => {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(firebaseConfig);
  }
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
};

export default registerRootComponent(App);
