import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BrowseBikes from '../screens/HomeStack/BrowseBikes';
import BikeDetails from '../screens/HomeStack/BikeDetails';
import CheckoutConfirmation from '../screens/HomeStack/CheckoutConfirmation';

const HomeStackNav = createStackNavigator();

const HomeStack = () => (
    <HomeStackNav.Navigator initialRouteName="BrowseBikes">
        <HomeStackNav.Screen name="BrowseBikes" component={BrowseBikes} />
        <HomeStackNav.Screen name="BikeDetails" component={BikeDetails} />
        <HomeStackNav.Screen name="CheckoutConfirmation" component={CheckoutConfirmation} />
    </HomeStackNav.Navigator>
)

export default HomeStack;