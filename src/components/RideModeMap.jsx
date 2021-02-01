import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { Icon, Text, View } from 'native-base';
import globalStyles from '../styles/styles';

// These define the initial zoom level of the map and probably
// don't need to be modified
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const RideModeMap = ({ location }) => (
  <MapView
    style={globalStyles.mapContainer}
    initialRegion={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
  />
);

RideModeMap.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default RideModeMap;
