import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text } from 'native-base';


const BikeDetails = ({ navigation }) => (
  <Container>
    <Content>
      <Text>Hello Bike Details Screen!</Text>
      <Button onPress={() =>navigation.push('CheckoutConfirmation')}>
        <Text>To Bike Checkout Confirmation</Text>
      </Button>
    </Content>
  </Container>
);

BikeDetails.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default BikeDetails;
