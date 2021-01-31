import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text } from 'native-base';
import Bike from '../../models/Bike';

const BikeDetails = ({ navigation, route }) => {
  // eslint-disable-next-line prefer-destructuring
  const bike = route.params.bike.bike;
  return (
    <Container>
      <Content>
        <Text>Hello Bike Details Screen!</Text>
        <Text>Bike ID is: {bike.getBikeId()}</Text>
        <Button onPress={() => navigation.push('CheckoutConfirmation')}>
          <Text>To Bike Checkout Confirmation</Text>
        </Button>
      </Content>
    </Container>
  );
};

BikeDetails.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      bike: PropTypes.shape({
        bike: PropTypes.instanceOf(Bike).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BikeDetails;
