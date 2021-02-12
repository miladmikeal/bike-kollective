import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Text } from 'native-base';

const RideModeHome = ({ navigation }) => (
  <Container>
    <Button onPress={() => navigation.push('DropOffSubmit')}>
      <Text>To bike drop off submit</Text>
    </Button>
  </Container>
);
RideModeHome.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default RideModeHome;
