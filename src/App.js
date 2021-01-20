import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/HomeStack';
// eslint-disable-next-line import/no-unresolved
import { TEST_VAR } from '@env';

const App = () => (
  <NavigationContainer>
    <HomeStack/>
  </NavigationContainer>
);

export default registerRootComponent(App);
