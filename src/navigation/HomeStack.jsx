import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'native-base';
import { AuthContext } from '../context/AuthProvider';
import BrowseBikes from '../screens/HomeStack/BrowseBikes';
import BikeDetails from '../screens/HomeStack/BikeDetails';
import CheckoutConfirmation from '../screens/HomeStack/CheckoutConfirmation';

const HomeStackNav = createStackNavigator();

const HomeStack = () => {
  const { logout } = useContext(AuthContext);
  return (
    <HomeStackNav.Navigator initialRouteName="BrowseBikes">
      <HomeStackNav.Screen name="BrowseBikes" component={BrowseBikes} options={{
        headerRight: () => (
          <Button transparent buttonPadding={20} icon onPress={() => logout()}>
            <AntDesign name="logout" size={24} color="black" />
          </Button>
        )
      }} />
      <HomeStackNav.Screen name="BikeDetails" component={BikeDetails} />
      <HomeStackNav.Screen name="CheckoutConfirmation" component={CheckoutConfirmation} />
    </HomeStackNav.Navigator>
  );
};

export default HomeStack;