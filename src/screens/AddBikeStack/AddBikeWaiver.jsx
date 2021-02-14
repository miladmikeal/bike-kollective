import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text, Title,View } from 'native-base';
import Unorderedlist from 'react-native-unordered-list';
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
        <View style={globalStyles.addBikeInfoView}>
          <Text>
            PLEASE READ CAREFULLY BEFORE SIGNING
          </Text>
          <Unorderedlist>
            <Text>You agree that you are the sole and legal owner of the bike.</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>This bike will become a part of the bike-kollective and you will no longer be the owner of the bike</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>The lock combination, {bike.lock}, is correct.</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>The bike is located at your device's curent location ({location.latitude.toFixed(3)}, {location.longitude.toFixed(3)}).</Text>
          </Unorderedlist>
        </View>
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
          lock: PropTypes.string.isRequired
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
