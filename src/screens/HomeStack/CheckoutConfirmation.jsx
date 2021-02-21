import React, { useContext } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';
import Unorderedlist from 'react-native-unordered-list';
import { AuthContext } from '../../context/AuthProvider';
import { checkOutBike } from '../../api/checkBike';
import Bike from '../../models/Bike';
import globalStyles from '../../styles/styles';

const CheckoutConfirmation = ({ navigation, route }) => {
  const { currentUser } = useContext(AuthContext);
  const bike = route.params.bike;
  const userEmail = currentUser.email;
  const bikeId = bike.id;
  return (
    <Container>
      <Content>
        <View style={styles.dataView} >
          <Text style={styles.boldText}>Confirmation Details</Text>
          <Unorderedlist>
            <Text>Unlock code: {bike.lock}</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>Safety: Always perform a full inspection before riding a bike.</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>Use: Follow all applicable traffic laws while riding the bike</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>Timeline: The bike must be returned within 24 hours</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>Return: Lock the bike and follow app instructions when you are ready to return it</Text>
          </Unorderedlist>
        </View>
        <Button
          style={globalStyles.addBikeButton}
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

const styles = {
  boldText: {
    fontWeight: 'bold'
  },
  dataView: {
    width: '90%',
    alignSelf: 'center'
  },
};

CheckoutConfirmation.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      bike: PropTypes.shape({
        bike: PropTypes.instanceOf(Bike).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CheckoutConfirmation;
