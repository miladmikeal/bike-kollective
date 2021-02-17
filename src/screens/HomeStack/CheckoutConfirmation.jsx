import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';
import { AuthContext } from '../../context/AuthProvider';
import { checkOutBike } from '../../api/checkBike';

const CheckoutConfirmation = ({ navigation, route }) => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.email);
  const bike = route.params.bike;
  const userEmail = currentUser.email;
  const bikeId = bike.id;
  return (
    <Container>
      <Content>
        <Text>Hello Checkout Details Screen!</Text>
        {/* NOTE SHOULD WE CHANGE RIDE MODE STACK NAME YET? */}
        <Button
          onPress={() => {
            checkOutBike(userEmail, bikeId);
            navigation.navigate('Ride Mode (temporary tab)', {
              screen: 'RideModeHome',
              params: { bike },
            });
          }}
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
