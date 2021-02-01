import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text, Grid, Row, Spinner } from 'native-base';
import RideModeMap from '../../components/RideModeMap';
import LocationServices from '../../utility/location';

const RideModeHome = ({ navigation }) => {
  const [location, setLocation] = useState();

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
      <Grid>
        <Row>
          <RideModeMap location={location} />
        </Row>
      </Grid>
      <Content>
        <Button onPress={() => navigation.push('DropOffSubmit')}>
          <Text>To bike drop off submit</Text>
        </Button>
      </Content>
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
