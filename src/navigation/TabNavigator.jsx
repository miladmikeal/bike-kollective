import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import AddBikeStack from './AddBikeStack';
import RideModeStack from './RideModeStack';

const TabNavigator = createBottomTabNavigator();

const TabNav = () => (
  <TabNavigator.Navigator initialRouteName='Home'>
    <TabNavigator.Screen name='Ride Mode (temporary tab)' component={RideModeStack} />
    <TabNavigator.Screen name='Home' component={HomeStack} />
    <TabNavigator.Screen name='Add Bike' component={AddBikeStack} />
  </TabNavigator.Navigator>
);

export default TabNav;
