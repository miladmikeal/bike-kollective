import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import Bike from '../../models/Bike';

const BrowseBikesMap = ({bikes}) => (
    <MapView
        style={{
            flex: 1
        }}
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
    >
        {bikes.map(bike => (
            <MapView.Marker
                coordinate={{
                    latitude: bike.getLatitude(),
                    longitude: bike.getLongitude(),
                }}
                key={bike.id}
            />
        ))}
    </MapView>
)

BrowseBikesMap.propTypes = {
    bikes: PropTypes.arrayOf(PropTypes.instanceOf(Bike)).isRequired
}

export default BrowseBikesMap
