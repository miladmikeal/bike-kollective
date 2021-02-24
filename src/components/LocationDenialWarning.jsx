import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text, Title, View } from 'native-base';
import globalStyles from '../styles/styles';

const LocationDenialWarning = ({ setErr, setLocationGranted }) => (
  <Container>
    <Content>
      <Title style={globalStyles.title}>
        <Text style={globalStyles.titleText}>
          Your location is required
        </Text>
      </Title>
      <View style={globalStyles.addBikeInfoView}>
        <Text style={styles.spacedText}>
          We're sorry, but your location must be enabled to use this app. Your location
          is used to display bikes near you, and to track the location of any
          bikes you choose to check out.
        </Text>
        <Text style={styles.spacedText}>
          Please enable locations for the app in your the device settings and then
          click the refresh button below.
        </Text>
      </View>
      <Button
        onPress={() => {
          setErr(undefined);
          setLocationGranted(undefined);
        }}
        style={globalStyles.addBikeButton}
      >
        <Text>Refresh</Text>
      </Button>
    </Content>
  </Container>
);

LocationDenialWarning.propTypes = {
  setErr: PropTypes.func.isRequired,
  setLocationGranted: PropTypes.func.isRequired,
};

const styles = {
  spacedText: {
    marginBottom: 10,
  }
};

export default LocationDenialWarning;
