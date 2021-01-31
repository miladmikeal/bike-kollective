import React, { useEffect, createContext, useState } from 'react';
import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { getUserInfo, signIn, signOut } from '../api/auth';

export const AuthContext = createContext({
  currentUser: null,
  login: () => { },
  logout: () => { }
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getUserInfo(user.uid).then(data => setCurrentUser(data));
      }
    });
    setLoading(false);
  }, [currentUser, setCurrentUser]);

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
    <AuthContext.Provider value={{
      currentUser,
      login: async (email, password) => {
        const user = await signIn(email, password);
        setCurrentUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
      },
      logout: async () => {
        await signOut();
        setCurrentUser(null);
        AsyncStorage.removeItem('user');
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
