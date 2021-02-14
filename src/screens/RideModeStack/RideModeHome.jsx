import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Text, Spinner } from 'native-base';

import SearchBar from '../../components/SearchBar';
import RideModeMap from '../../components/RideModeMap';
import LocationServices from '../../utility/location';

import globalStyles from '../../styles/styles';

const RideModeHome = ({ navigation }) => {
  const [location, setLocation] = useState();
  const [destination, setDestination] = useState();

  useEffect(() => {
    LocationServices.getCurrentLocation().then((currentLocation) =>
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      })
    );
  }, []);

  if (!location) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <RideModeMap location={location} destination={destination} />
      <SearchBar
        destination={destination}
        onDestinationChange={(newDestination) => setDestination(newDestination)}
        style={globalStyles.inputStyle}
      />
      <Button onPress={() => navigation.push('DropOffSubmit')}>
        <Text>To bike drop off submit</Text>
      </Button>
    </Container>
  );
};

RideModeHome.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default RideModeHome;
