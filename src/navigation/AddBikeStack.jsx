import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddBikeFormScreen from '../screens/AddBikeStack/AddBikeFormScreen';
import AddBikeWaiver from '../screens/AddBikeStack/AddBikeWaiver';
import AddBikeSubmit from '../screens/AddBikeStack/AddBikeSubmit';

const AddBikeStackNav = createStackNavigator();

const AddBikeStack = () => (
  <AddBikeStackNav.Navigator initialRouteName="BrowseBikes">
    <AddBikeStackNav.Screen name="AddBikeFormScreen" component={AddBikeFormScreen} />
    <AddBikeStackNav.Screen name="AddBikeWaiver" component={AddBikeWaiver} />
    <AddBikeStackNav.Screen name="AddBikeSubmit" component={AddBikeSubmit} />
  </AddBikeStackNav.Navigator>
);

export default AddBikeStack;