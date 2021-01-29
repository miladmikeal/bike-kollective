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
                    latitude: bike.g.geopoint.U,
                    longitude: bike.g.geopoint.k,
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
        keywords: PropTypes.string.isRequired,
        pic_url: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        checked_out: PropTypes.bool.isRequired,
        distance: PropTypes.number.isRequired,
        g: PropTypes.shape({
           geopoint: PropTypes.shape({
               U: PropTypes.number,
               k: PropTypes.number
           })
        })
    })).isRequired
}

export default BrowseBikesMap
