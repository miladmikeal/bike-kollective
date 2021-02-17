import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';

const CheckoutConfirmation = ({ navigation, route }) => {
  const bike = route.params.bike;
  return (
    <Container>
      <Content>
        <Text>Hello Checkout Details Screen!</Text>
        {/* NOTE SHOULD WE CHANGE RIDE MODE STACK NAME YET? */}
        <Button
          onPress={() =>
            navigation.navigate('Ride Mode (temporary tab)', {
              screen: 'RideModeHome',
              params: { bike },
            })
          }
        >
          <Text>Confirm Checkout</Text>
        </Button>
      </Content>
    </Container>
  );
};

CheckoutConfirmation.propTypes = {
  navigation: PropTypes.isRequired,
  route: PropTypes.isRequired,
};

export default CheckoutConfirmation;
