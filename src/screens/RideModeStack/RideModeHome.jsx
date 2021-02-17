import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Text } from 'native-base';

const RideModeHome = ({ navigation, route }) => {
  const bike = route.params.bike;
  return (
    <Container>
      <Button onPress={() => navigation.push('DropOffSubmit', { bike })}>
        <Text>To bike drop off submit</Text>
      </Button>
    </Container>
  );
};

RideModeHome.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.isRequired,
};

export default RideModeHome;
