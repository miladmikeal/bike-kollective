import React, { useState, useContext } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { Container, Content, Grid, Row, Text, Spinner } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import haversine from 'haversine';
import { AuthContext } from '../../context/AuthProvider';
import LocationDenialWarning from '../../components/LocationDenialWarning';
import BrowseBikesFab from '../../components/BrowseBikesFab';
import BrowseBikesForm from '../../components/BrowseBikesForm';
import BrowseBikesMap from '../../components/BrowseBikesMap';
import BrowseBikesList from '../../components/BrowseBikesList';
import { getBikesWithinRadius, getUserBikes } from '../../api/bikes';
import LocationServices from '../../utility/location';
import filterBikes from '../../utility/filterBikes';
import { mileToKm } from '../../utility/distanceConversion';
import { getRentalDetails } from '../../api/bikeRental';

const DEFAULT_SEARCH_RADIUS_MILES = 25;
const RERESH_INTERVAL_MS = 5000; // Time interval to check new position
const RERENDER_DISTANCE_METERS = 10; // Travel from state distance that will lead to a rerender
const USER_LOCATION_DENIAL = 'USER_LOCATION_DENIAL';

const BrowseBikes = ({ navigation }) => {
  const [data, setData] = useState();
  const [err, setErr] = useState();
  const [searchRadiusMi, setSearchRadiusMi] = useState(DEFAULT_SEARCH_RADIUS_MILES);
  const [locationGranted, setLocationGranted] = useState();
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

  const { currentUser } = useContext(AuthContext);
  getUserBikes(currentUser.email)
    .then((userBikes) => {
      if (userBikes.length > 1) {
        setErr(`Error: user, ${currentUser.email}, has more than 1 bike checked out.`);
      } else if (userBikes.length > 0) {
        getRentalDetails(userBikes[0].id)
          .then((rental) => {
            const bike = userBikes[0];
            const rentalId = rental.id;
            navigation.navigate('Ride Mode', {
              screen: 'RideModeHome',
              params: { bike, rentalId }
            });
          })
          .catch((e) => setErr(e));
      }
    })
    .catch((e) => setErr(e));

  // Asking for location and being denied repeatedly causes Expo to
  // crash, so only ask once.
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

  if (location && !err && (!data || searchRadiusMi !== filterValues.distanceMi)) {
    const centerPoint = new firebase.firestore.GeoPoint(location.latitude, location.longitude);
    getBikesWithinRadius(centerPoint, mileToKm(filterValues.distanceMi))
      .then((bikes) => {
        setData(bikes);
        setSearchRadiusMi(filterValues.distanceMi);
      })
      .catch((e) => setErr(e));
  }

  if (err && err === USER_LOCATION_DENIAL) {
    return (
      <Container>
        <LocationDenialWarning setErr={ setErr } setLocationGranted={ setLocationGranted } />
      </Container>
    );
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
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default BrowseBikes;
