import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddBikeFormScreen from '../screens/AddBikeStack/AddBikeFormScreen';
import AddBikePic from '../screens/AddBikeStack/AddBikePic';
import AddBikeWaiver from '../screens/AddBikeStack/AddBikeWaiver';
import AddBikeSubmit from '../screens/AddBikeStack/AddBikeSubmit';

const AddBikeStackNav = createStackNavigator();

const AddBikeStack = () => (
  <AddBikeStackNav.Navigator initialRouteName="BrowseBikes">
    <AddBikeStackNav.Screen
      name="AddBikeFormScreen"
      component={AddBikeFormScreen}
      options={{ title: 'Donate Bike' }}
    />
    <AddBikeStackNav.Screen
      name="AddBikePic"
      component={AddBikePic}
      options={{ title: 'Upload Bike Photo' }}
    />
    <AddBikeStackNav.Screen
      name="AddBikeWaiver"
      component={AddBikeWaiver}
      options={{ title: 'Waiver' }}
    />
    <AddBikeStackNav.Screen
      name="AddBikeSubmit"
      component={AddBikeSubmit}
      options={{ title: 'Confirm Donation' }}
    />
  </AddBikeStackNav.Navigator>
);

export default AddBikeStack;
