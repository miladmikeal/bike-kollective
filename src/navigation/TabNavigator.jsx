import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import AddBikeStack from './AddBikeStack';
import RideModeStack from './RideModeStack';

const TabNavigator = createBottomTabNavigator();

const TabNav = () => (
  <TabNavigator.Navigator
    screenOptions={({ route }) => ({
      tabBarButton: [
        'Ride Mode'
      ].includes(route.name)
        ? () => null
        :
        undefined,
    })}
    initialRouteName='Home'
  >
    <TabNavigator.Screen
      name='Ride Mode'
      component={RideModeStack}
      options={{ tabBarVisible: false }}
    />
    <TabNavigator.Screen
      name='Home'
      component={HomeStack}
      options={{
        tabBarLabel: 'Bikes',
        tabBarIcon: () => <MaterialIcons name='location-searching' size={24} color='black' />,
      }}
    />
    <TabNavigator.Screen
      name='Add Bike'
      component={AddBikeStack}
      options={{
        tabBarLabel: 'Donate',
        tabBarIcon: () => <Ionicons name='ios-thumbs-up-sharp' size={24} color='black' />,
      }}
    />
  </TabNavigator.Navigator>
);

export default TabNav;
