import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import {
  GOOGLE_MAPS_APIKEY,
  // eslint-disable-next-line import/no-unresolved
} from '@env';
import MapViewDirections from 'react-native-maps-directions';
import globalStyles from '../styles/styles';

// These define the initial zoom level of the map and probably
// don't need to be modified
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const RideModeMap = ({ location }) => (
  <>
    <MapView
      style={globalStyles.mapContainer}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
    />
    <MapViewDirections
      origin={location}
      destination={{ latitude: 30.77, longitude: -111 }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor="hotpink"
    />
  </>
);

RideModeMap.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default RideModeMap;
