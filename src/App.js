import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { TEST_VAR } from '@env';

import TabNavigator from './navigation/TabNavigator';
import firebase from '../config/firebase.config.js';

const App = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default registerRootComponent(App);
