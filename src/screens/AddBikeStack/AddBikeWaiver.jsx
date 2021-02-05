import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text, Title } from 'native-base';
import globalStyles from '../../styles/styles';

// TODO axe this comment block
// console.log(route.params.values.values);

const AddBikeWaiver = ({ navigation, route }) => (
  <Container>
    <Content>
      <Title style={globalStyles.title}>
        <Text style={globalStyles.titleText}>
          Release of Interest
        </Text>
      </Title>
      <Text>
        PLEASE READ CAREFULLY BEFORE SIGNING
      </Text>
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
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      values: PropTypes.shape({
        values: PropTypes.shape({
          name: PropTypes.string.isRequired,
          style: PropTypes.string.isRequired,
          size: PropTypes.string.isRequired,
          keywords: PropTypes.string,
        }).isRequired
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AddBikeWaiver;
