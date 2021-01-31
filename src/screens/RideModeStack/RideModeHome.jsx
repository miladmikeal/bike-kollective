import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text } from 'native-base';


const RideModeHome = ({ navigation }) => (
  <Container>
    <Content>
      <Text>Hello Ride Mode Home Screen!</Text>
      <Button onPress={() =>navigation.push('DropOffSubmit')}>
        <Text>To bike drop off submit</Text>
      </Button>
    </Content>
  </Container>
);

RideModeHome.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default RideModeHome;
