import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

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
                    latitude: bike.latitude,
                    longitude: bike.longitude
                }}
                key={bike.id}
            />
        ))}
    </MapView>
)

BrowseBikesMap.propTypes = {
    bikes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        frame: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
    })).isRequired
}

export default BrowseBikesMap
