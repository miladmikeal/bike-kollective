import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BrowseBikes from '../screens/HomeStack/BrowseBikes';
import BikeDetails from '../screens/HomeStack/BikeDetails';

const HomeStackNav = createStackNavigator();

const HomeStack = () => (
    <HomeStackNav.Navigator>
        <HomeStack.Screen name="BrowseBikes" component={BrowseBikes} />
        <HomeStack.Screen name="BikeDetails" component={BikeDetails} />
    </HomeStackNav.Navigator>
)

export default HomeStack;