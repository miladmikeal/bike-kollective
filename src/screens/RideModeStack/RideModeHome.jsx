import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet } from 'react-native';
import { Button, Container, Text, Spinner } from 'native-base';
import CountDown from 'react-native-countdown-component';
import Bike from '../../models/Bike';
import { checkInBike } from '../../api/checkBike';
import { deleteBikeRental, getRentalDetails } from '../../api/bikeRental';

const RideModeHome = ({ navigation, route }) => {
  const [timeRemaining, setTimeRemaining] = useState();
  const [rentalId, setRentalId] = useState();
  const [err, setErr] = useState();

  const bike = route.params.bike;
  // If this is a new rental, update timeRemaining
  if (rentalId !== route.params.rentalId || timeRemaining === null) {
    getRentalDetails(bike.id)
      .then((rental) => {
        const timeNow = new Date();
        const rideReturnTime = new Date(rental.returnTime);
        setTimeRemaining((rideReturnTime - timeNow) / 1000);
        setRentalId(route.params.rentalId);
      })
      .catch((e) => setErr(e));
  }

  // If the user is beyond their rental period, they will be hit with an alert
  // to turn in the bike and the bike will be force returned.
  const returnBikeNow = async () => {
    Alert.alert(
      'You have exceded your rental duration. Please lock up the bike. Thanks for riding with BikeKollective!'
    );
    await deleteBikeRental(bike.id);
    await checkInBike(bike.id);
    setTimeRemaining();
    navigation.navigate('Home', {
      screen: 'BrowseBikes',
    });
  };

  if (err) {
    return (
      <Container>
        <Text>Error encountered when trying to retrieve rental info from datastore: {err}</Text>
      </Container>
    );
  }

  if (!timeRemaining) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (timeRemaining < 0) {
    returnBikeNow();
    return <Text style={{ margin: 20 }}>Maximum ride time exceeded</Text>;
  }

  return (
    <Container style={styles.container}>
      <Text style={{ margin: 20 }}>Ride Time Remaining: </Text>
      <CountDown
        until={Math.trunc(timeRemaining)}
        digitStyle={{ backgroundColor: '#FFF' }}
        onFinish={() => returnBikeNow()}
        timeToShow={['H', 'M', 'S']}
        size={40}
      />
      <Text style={{ margin: 20 }}>Unlock code: {bike.lock}</Text>
      <Button
        style={styles.button}
        onPress={() => {
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
  route: PropTypes.shape({
    params: PropTypes.shape({
      bike: PropTypes.instanceOf(Bike).isRequired,
      rentalId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RideModeHome;
