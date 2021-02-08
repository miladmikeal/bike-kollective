import React from 'react';
import { View, TextInput } from 'react-native';
import globalStyles from '../styles/styles';

const SearchBar = () => (
  <View style={globalStyles.textInputContainer}>
    <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Get Directions" />
  </View>
);
export default SearchBar;
