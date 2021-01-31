import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import {
  Button,
  Container,
  Grid,
  Row,
  Text,
  Spinner,
  H1
} from 'native-base';
import BrowseBikesMap from '../../components/BrowseBikesMap';
import { getBikesWithinRadius } from '../../api/bikes';
import { logout } from '../../api/auth';
import LocationServices from '../../../utility/location';

const BrowseBikes = ({ navigation }) => {
  const currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');
  const [data, setData] = useState();
  const [err, setErr] = useState();
  // eslint-disable-next-line no-unused-vars
  const [searchRadiusKm, setSearchRadiusKm] = useState(50);
  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState();

  useEffect(() => {
    async function getUserInfo() {
      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert('No user data found!');
      } else {
        const dataObj = doc.data();
        setFirstName(dataObj.firstName);
      }
    }
    getUserInfo();
  });

  function handlePress() {
    logout();
    navigation.replace('AuthStack');
  }

  if (!locationGranted) {
    LocationServices.getLocationPermission()
      .then((permission) => setLocationGranted(permission));
  }

  if (!location) {
    LocationServices.getCurrentLocation().then((currentLocation) => {
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
    });
  }

  if (location && !data && !err) {
    const centerPoint = new firebase.firestore.GeoPoint(location.latitude, location.longitude);
    const radiusKm = searchRadiusKm;
    getBikesWithinRadius(centerPoint, radiusKm)
      .then((bikes) => {
        setData(bikes);
      })
      .catch((e) => {
        setErr(e);
      });
  }

  if (err) {
    return (
      <Container>
        <Text>Error encountered when trying to retrieve bikes from datastore: {err}</Text>
      </Container>
    );
  }

  if (!data) {
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
          <BrowseBikesMap bikes={data} location={location} />
        </Row>
        <Row>
          <H1>Hello {firstName} with ID: {currentUserUID}</H1>
        </Row>
        <Row>
          <Grid>
            <Row>
              <Text>Hello Bike Browsing Screen!</Text>
            </Row>
            <Row>
              <Button onPress={() => navigation.push('BikeDetails')}>
                <Text>To Bike Details</Text>
              </Button>
            </Row>
            <Row>
              <Button light onPress={handlePress}>
                <Text>Logout</Text>
              </Button>
            </Row>
          </Grid>
        </Row>
      </Grid>
    </Container>
  );
};

BrowseBikes.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default BrowseBikes;
