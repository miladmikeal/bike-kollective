/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button, Container, Text } from 'native-base';
import CountDown from 'react-native-countdown-component';
import { checkInBike } from '../../api/checkBike';
import { deleteBikeRental } from '../../api/bikeRental';

const RideModeHome = ({ navigation, route }) => {
  const bike = route.params.bike;

  // If the user is beyond their rental period, they will be hit with an alert
  // to turn in the bike and the bike will be force returned.
  const returnBikeNow = async () => {
    alert(
      'You have exceded your rental duration. Please lock up the bike. Thanks for riding with BikeKollective!'
    );
    await deleteBikeRental(bike.id);
    await checkInBike(bike.id);
    navigation.navigate('Home', {
      screen: 'BrowseBikes',
    });
  };

  return (
    <Container style={styles.container}>
      <Text style={{ margin: 20 }}>Ride Time Remaining: </Text>
      <CountDown
        id={Math.random()}
        until={7200}
        digitStyle={{ backgroundColor: '#FFF' }}
        onFinish={() => returnBikeNow()}
        timeToShow={['H', 'M', 'S']}
        size={20}
      />

      <Button
        style={styles.button}
        onPress={async () => {
          navigation.push('DropOffSubmit', { bike });
        }}
      >
        <Text>Return Bike</Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    width: '50%',
    margin: 20,
  },
});

RideModeHome.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.isRequired,
};

export default RideModeHome;
