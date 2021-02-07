import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { Container, Content, Grid, Row, Text, Spinner } from 'native-base';
import BrowseBikesMap from '../../components/BrowseBikesMap';
import BrowseBikesList from '../../components/BrowseBikesList';
import { getBikesWithinRadius } from '../../api/bikes';
import LocationServices from '../../utility/location';

const BrowseBikes = ({ navigation }) => {
  const currentUserUID = firebase.auth().currentUser.uid;
  // eslint-disable-next-line no-unused-vars
  const [firstName, setFirstName] = useState('');
  const [data, setData] = useState();
  const [err, setErr] = useState();
  // eslint-disable-next-line no-unused-vars
  const [searchRadiusKm, setSearchRadiusKm] = useState(50);
  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState();

  useEffect(() => {
    async function getUserInfo() {
      const doc = await firebase.firestore().collection('users').doc(currentUserUID).get();

      if (!doc.exists) {
        Alert.alert('No user data found!');
      } else {
        const dataObj = doc.data();
        setFirstName(dataObj.firstName);
      }
    }
    getUserInfo();
  });

  if (!locationGranted) {
    LocationServices.getLocationPermission().then((permission) => setLocationGranted(permission));
  }

  if (!location) {
    LocationServices.getCurrentLocation().then((currentLocation) => {
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
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
          <Content>
            <BrowseBikesList bikes={data} searchRadiusKm={searchRadiusKm} navigation={navigation} />
          </Content>
        </Row>
      </Grid>
    </Container>
  );
};

BrowseBikes.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default BrowseBikes;
