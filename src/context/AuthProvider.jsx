import React, { createContext, useState } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { signIn, signOut } from '../api/auth';

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => { },
  login: () => { },
  logout: () => { }
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      login: async (email, password) => {
        let user;
        try {
          user = await signIn(email, password);
        } catch (error) {
          Alert.alert(error.message);
          setCurrentUser(null);
        }
        if (user.email) {
          setCurrentUser(user);
          AsyncStorage.setItem('user', JSON.stringify(user));
        }
      },
      logout: async () => {
        await signOut();
        setCurrentUser(null);
        AsyncStorage.removeItem('user');
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
