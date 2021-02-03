/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from 'react';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import TabNavigator from './navigation/TabNavigator';
import AuthStack from './navigation/AuthStack';
import { AuthContext } from './context/AuthProvider';
import { getUserInfo } from './api/auth';

const Routes = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  function onAuthStateChanged(user) {
    if (user) {
      getUserInfo(user.uid)
        .then(data => setCurrentUser(data))
        .catch(err => Alert.alert(err.message));
    }
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    );
  }

  return (
    <NavigationContainer>
      {currentUser !== null ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
