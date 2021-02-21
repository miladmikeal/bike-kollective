import React, { useState } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { Container, Content, Grid, Row, Text, Spinner } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import haversine from 'haversine';
import BrowseBikesFab from '../../components/BrowseBikesFab';
import BrowseBikesForm from '../../components/BrowseBikesForm';
import BrowseBikesMap from '../../components/BrowseBikesMap';
import BrowseBikesList from '../../components/BrowseBikesList';
import { getBikesWithinRadius } from '../../api/bikes';
import LocationServices from '../../utility/location';
import filterBikes from '../../utility/filterBikes';
import { mileToKm } from '../../utility/distanceConversion';

const DEFAULT_SEARCH_RADIUS_MILES = 25;
const RERESH_INTERVAL_MS = 5000; // Time interval to check new position
const RERENDER_DISTANCE_METERS = 10; // Travel from state distance that will lead to a rerender

const BrowseBikes = ({ navigation }) => {
  // eslint-disable-next-line no-unused-vars
  const [firstName, setFirstName] = useState('');
  const [data, setData] = useState();
  const [err, setErr] = useState();
  // eslint-disable-next-line no-unused-vars
  const [searchRadiusMi, setSearchRadiusMi] = useState(DEFAULT_SEARCH_RADIUS_MILES);
  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState();
  const [selectedBikeID, setSelectedBikeID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({
    name: '',
    style: '',
    frame: 'Size', // Native Base Pickers do not show placeholders, so this is a workaround
    keywords: '',
    distanceMi: DEFAULT_SEARCH_RADIUS_MILES
  });

  useFocusEffect(() => {
    const interval = setInterval(() => {
      if (locationGranted) {
        LocationServices.getCurrentLocation().then((currentLocation) => {
          const distDelta = haversine(location, currentLocation.coords, {unit: 'meter'});
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

  if (location && !err && (!data || searchRadiusMi !== filterValues.distanceMi)) {
    const centerPoint = new firebase.firestore.GeoPoint(location.latitude, location.longitude);
    getBikesWithinRadius(centerPoint, mileToKm(filterValues.distanceMi))
      .then((bikes) => {
        setData(bikes);
        setSearchRadiusMi(filterValues.distanceMi);
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

  const filteredBikes = filterBikes(data, filterValues);

  return (
    <Container>
      <Modal visible={modalVisible}>
        <BrowseBikesForm
          setModalVisible={setModalVisible}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
      </Modal>
      <Grid>
        <Row>
          <BrowseBikesMap bikes={filteredBikes} location={location} selectedBikeID={selectedBikeID} setSelectedBikeID={setSelectedBikeID}/>
        </Row>
        <Row>
          <Content>
            <BrowseBikesList bikes={filteredBikes} location={location} searchRadiusMi={searchRadiusMi} navigation={navigation} selectedBikeID={selectedBikeID} setSelectedBikeID={setSelectedBikeID}/>
          </Content>
        </Row>
      </Grid>
      <BrowseBikesFab
        centerPoint={new firebase.firestore.GeoPoint(location.latitude, location.longitude)}
        radiusMi={searchRadiusMi}
        setData={setData}
        setErr={setErr}
        setModalVisible={setModalVisible}
      />
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
