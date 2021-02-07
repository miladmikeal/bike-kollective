import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text, Title } from 'native-base';
import globalStyles from '../../styles/styles';

const AddBikeWaiver = ({ navigation, route }) => {
  const bike = route.params.values.values;
  const location = route.params.location.location;

  return (
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
        <Button
          onPress={() => navigation.push('AddBikeSubmit', { bike: { bike }, location: { location } })}
          style={globalStyles.addBikeButton}
        >
          <Text>Agree</Text>
        </Button>
      </Content>
    </Container>
  );
};

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
          frame: PropTypes.string.isRequired,
          keywords: PropTypes.string,
        }).isRequired,
      }).isRequired,
      location: PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired
        })
      }).isRequired
    }).isRequired,
  }).isRequired,
};

export default AddBikeWaiver;
