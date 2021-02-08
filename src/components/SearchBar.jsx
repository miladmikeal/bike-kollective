import React from 'react';
import { View, TextInput } from 'react-native';
// import { Feather } from '@expo/vector-icons';
import globalStyles from '../styles/styles';

const SearchBar = () => (
  <View style={globalStyles.backgroundStyle}>
    <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Get Directions" />
  </View>
);
export default SearchBar;
