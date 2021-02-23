import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RideModeHome from '../screens/RideModeStack/RideModeHome';
import DropOffSubmit from '../screens/RideModeStack/DropOffSubmit';

const RideModeStackNav = createStackNavigator();

const RideModeStack = () => (
  <RideModeStackNav.Navigator initialRouteName="RideModeHome">
    <RideModeStackNav.Screen
      name="RideModeHome"
      component={RideModeHome}
      options={{
        title: 'Ride Mode',
      }}
    />
    <RideModeStackNav.Screen
      name="DropOffSubmit"
      component={DropOffSubmit}
      options={{
        title: 'Return Bike',
      }}
    />
  </RideModeStackNav.Navigator>
);

export default RideModeStack;
