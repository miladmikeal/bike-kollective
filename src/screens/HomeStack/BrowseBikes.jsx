import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Alert, Modal } from 'react-native';
import { Button, Container, Content, Grid, Row, Text, Spinner } from 'native-base';
import BrowseBikesFab from '../../components/BrowseBikesFab';
import BrowseBikesForm from '../../components/BrowseBikesForm';
import BrowseBikesMap from '../../components/BrowseBikesMap';
import BrowseBikesList from '../../components/BrowseBikesList';
import { getBikesWithinRadius } from '../../api/bikes';
import LocationServices from '../../utility/location';
import filterBikes from '../../utility/filterBikes';
import { mileToKm } from '../../utility/distanceConversion';

const BrowseBikes = ({ navigation }) => {
  const currentUserUID = firebase.auth().currentUser.uid;
  // eslint-disable-next-line no-unused-vars
  const [firstName, setFirstName] = useState('');
  const [data, setData] = useState();
  const [err, setErr] = useState();
  // eslint-disable-next-line no-unused-vars
  const [searchRadiusMi, setSearchRadiusMi] = useState(25);
  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState();
  const [selectedBikeID, setSelectedBikeID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({
    name: '',
    style: '',
    frame: 'Size', // Native Base Pickers do not show placeholders, so this is a workaround
    keywords: '',
    distanceMi: 25
  });

  console.log(filterValues);

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

  if (location && !err && (!data || searchRadiusMi !== filterValues.distanceMi)) {
    console.log('running getbikesinradius. radius');
    const centerPoint = new firebase.firestore.GeoPoint(location.latitude, location.longitude);
    const radiusKm = mileToKm(filterValues.distanceMi);
    getBikesWithinRadius(centerPoint, radiusKm)
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
            <BrowseBikesList bikes={filteredBikes} searchRadiusMi={searchRadiusMi} navigation={navigation} selectedBikeID={selectedBikeID} setSelectedBikeID={setSelectedBikeID}/>
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
