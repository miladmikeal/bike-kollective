import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
// eslint-disable-next-line import/no-unresolved
import { TEST_VAR } from '@env';

const App = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);

export default registerRootComponent(App);
