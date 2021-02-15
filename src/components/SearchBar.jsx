import React from 'react';
import { View, TextInput } from 'react-native';
import globalStyles from '../styles/styles';

const SearchBar = ({ destination, onDestinationChange }) => (
  <View style={globalStyles.textInputContainer}>
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Get Directions"
      value={destination}
      onChangeText={(destination) => onDestinationChange(destination)}
    />
  </View>
);
export default SearchBar;
