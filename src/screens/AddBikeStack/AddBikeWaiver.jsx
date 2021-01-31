import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text } from 'native-base';


const AddBikeWaiver = ({ navigation }) => (
  <Container>
    <Content>
      <Text>Hello Add Bike Waiver!</Text>
      <Button onPress={() =>navigation.push('AddBikeSubmit')}>
        <Text>To add bike submit</Text>
      </Button>
    </Content>
  </Container>
);

AddBikeWaiver.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default AddBikeWaiver;
