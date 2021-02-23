import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button, Container, Text } from 'native-base';

const RideModeHome = ({ navigation, route }) => {
  const bike = route.params.bike;
  return (
    <Container style={styles.container}>
      <Button style={styles.button} onPress={() => navigation.push('DropOffSubmit', { bike })}>
        <Text>Return Bike</Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    width: '50%',
  },
});

RideModeHome.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.isRequired,
};

export default RideModeHome;
