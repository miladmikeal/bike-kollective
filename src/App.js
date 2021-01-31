/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import TabNavigator from './navigation/TabNavigator';
import AuthStack from './navigation/AuthStack';
import firebaseConfig from '../config/firebase.config.js';
import { AuthProvider } from './context/AuthProvider';
import { getUserInfo } from './api/auth';

// Something is setting massive timeouts
LogBox.ignoreLogs(['Setting a timer']);

const App = () => {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(firebaseConfig);
  }

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getUserInfo(user.uid).then(data => setCurrentUser(data))
      }
    });
    setLoading(false);
  }, [currentUser]);

  if (loading) {
    return (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    )
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        {currentUser !== null ? <TabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthProvider>
  );
};

export default registerRootComponent(App);
