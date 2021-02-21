import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { Icon } from 'native-base';
import Bike from '../models/Bike';
import globalStyles from '../styles/styles';

// This defines the initial zoom level of the map
const LATITUDE_DELTA = 0.125;

// This ratio is important for the map to not look distorted
const LONGITUDE_DELTA = 0.456616052060738 * LATITUDE_DELTA;

const BikePickUpMap = ({ bike, location }) => (
  <MapView
    style={globalStyles.mapContainer}
    initialRegion={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
  >
    <MapView.Marker
      coordinate={{
        latitude: bike.getLatitude(),
        longitude: bike.getLongitude(),
      }}
      key={bike.id}
    />
    <MapView.Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
    >
      <Icon type='MaterialIcons' name='my-location' style={globalStyles.currentLocationIcon}/>
    </MapView.Marker>
  </MapView>
);

BikePickUpMap.propTypes = {
  bike: PropTypes.instanceOf(Bike).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default BikePickUpMap;
