import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { Icon } from 'native-base';
import Bike from '../models/Bike';
import globalStyles from '../styles/styles';

// This defines the initial zoom level of the map
// Roughly 40 miles wide the in the middle of the US
const LATITUDE_DELTA = 0.461;

// This ratio is important for the map to not look distorted
const LONGITUDE_DELTA = 0.456616052060738 * LATITUDE_DELTA;

const BrowseBikesMap = ({ bikes, location, selectedBikeID, setSelectedBikeID }) => (
  <MapView
    style={globalStyles.mapContainer}
    initialRegion={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }}
  >
    {bikes.map(bike => {
      if (!bike.getCheckedOut()) {
        let markerColor = 'red';
        if (bike.id === selectedBikeID) {
          markerColor = 'blue';
        }
        return (
          <MapView.Marker
            coordinate={{
              latitude: bike.getLatitude(),
              longitude: bike.getLongitude(),
            }}
            onPress={() => { setSelectedBikeID(bike.id); }}
            pinColor={markerColor}

            // MapView markers will only rerender if a different key is used.
            // https://github.com/react-native-maps/react-native-maps/issues/1611
            key={`${bike.id}${Date.now()}`}
          />
        );
      }
      return null;
    })}

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

BrowseBikesMap.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.instanceOf(Bike)).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  selectedBikeID: PropTypes.string.isRequired,
  setSelectedBikeID: PropTypes.func.isRequired
};

export default BrowseBikesMap;
