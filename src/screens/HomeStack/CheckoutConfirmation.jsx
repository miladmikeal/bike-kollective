import React, { useState, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Container, Grid, Row, Spinner, Text } from 'native-base';
import Unorderedlist from 'react-native-unordered-list';
import { useFocusEffect } from '@react-navigation/native';
import haversine from 'haversine';
import BikePickUpMap from '../../components/BikePickUpMap';
import LocationDenialWarning from '../../components/LocationDenialWarning';
import { AuthContext } from '../../context/AuthProvider';
import LocationServices from '../../utility/location';
import { checkOutBike } from '../../api/checkBike';
import Bike from '../../models/Bike';
import globalStyles from '../../styles/styles';
import { createBikeRental } from '../../api/bikeRental';

const RERENDER_DISTANCE_METERS = 1;
const RERESH_INTERVAL_MS = 1000;
const USER_LOCATION_DENIAL = 'USER_LOCATION_DENIAL';

const CheckoutConfirmation = ({ navigation, route }) => {
  const [locationGranted, setLocationGranted] = useState();
  const [location, setLocation] = useState();
  const [err, setErr] = useState();

  const { currentUser } = useContext(AuthContext);
  const bike = route.params.bike;
  const userEmail = currentUser.email;
  const bikeId = bike.id;

  useFocusEffect(() => {
    const interval = setInterval(() => {
      if (locationGranted) {
        LocationServices.getCurrentLocation().then((currentLocation) => {
          const distDelta = haversine(location, currentLocation.coords, { unit: 'meter' });
          if (distDelta > RERENDER_DISTANCE_METERS) {
            setLocation({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            });
          }
        });
      }
    }, RERESH_INTERVAL_MS);
    return () => clearInterval(interval);
  });

  function handleConfirm() {
    checkOutBike(userEmail, bikeId);
    createBikeRental(userEmail, bikeId)
      .then((rentalId) => {
        navigation.navigate('Ride Mode', {
          screen: 'RideModeHome',
          params: { bike, rentalId },
        });
      })
      .catch((e) => setErr(e));
  }

  if (locationGranted === undefined) {
    LocationServices.getLocationPermission()
      .then((permission) => {
        if (permission === false) {
          setErr(USER_LOCATION_DENIAL);
          setLocationGranted(permission);
        } else {
          setLocationGranted(permission);
        }
      })
      .catch((e) => setErr(e));
  }

  if (!location && locationGranted) {
    LocationServices.getCurrentLocation().then((currentLocation) => {
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    });
  }

  if (err && err === USER_LOCATION_DENIAL) {
    return (
      <Container>
        <LocationDenialWarning setErr={setErr} setLocationGranted={setLocationGranted} />
      </Container>
    );
  }

  if (!location) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <Grid>
        <Row>
          <BikePickUpMap bike={bike} location={location} />
        </Row>
        <Row>
          <Grid>
            <Row>
              <ScrollView>
                <View style={styles.dataView}>
                  <Text style={styles.boldText}>Confirmation Details</Text>
                  <Unorderedlist>
                    <Text>Unlock code: {bike.lock}</Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text>Safety: Always perform a full inspection before riding a bike</Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text>Use: Follow all applicable traffic laws while riding the bike</Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text>Timeline: The bike must be returned within 24 hours</Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text>
                      Return: Lock the bike and follow app instructions when you are ready to return
                      it
                    </Text>
                  </Unorderedlist>
                </View>
              </ScrollView>
            </Row>
            <Row style={{ height: '20%' }}>
              <Button
                style={globalStyles.addBikeButton}
                onPress={handleConfirm}
              >
                <Text>Confirm Checkout</Text>
              </Button>
            </Row>
          </Grid>
        </Row>
      </Grid>
    </Container>
  );
};

const styles = {
  boldText: {
    fontWeight: 'bold',
  },
  dataView: {
    width: '90%',
    alignSelf: 'center',
  },
};

CheckoutConfirmation.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      bike: PropTypes.instanceOf(Bike).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CheckoutConfirmation;
