import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddBikeForm from '../screens/AddBikeStack/AddBikeForm';
import AddBikeWaiver from '../screens/AddBikeStack/AddBikeWaiver';
import AddBikeSubmit from '../screens/AddBikeStack/AddBikeSubmit';

const AddBikeStackNav = createStackNavigator();

const AddBikeStack = () => (
    <AddBikeStackNav.Navigator initialRouteName="BrowseBikes">
        <AddBikeStackNav.Screen name="AddBikeForm" component={AddBikeForm} />
        <AddBikeStackNav.Screen name="AddBikeWaiver" component={AddBikeWaiver} />
        <AddBikeStackNav.Screen name="AddBikeSubmit" component={AddBikeSubmit} />
    </AddBikeStackNav.Navigator>
)

export default AddBikeStack;