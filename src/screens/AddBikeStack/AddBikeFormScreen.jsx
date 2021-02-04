import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Title } from 'native-base';
import AddBikeForm from '../../components/AddBikeForm';
import globalStyles from '../../styles/styles';

const AddBikeFormScreen = ({ navigation }) => (
  <Container>
    <Content>
      <Title style={globalStyles.title}>
        <Text style={globalStyles.titleText}>
          Let's get your bike details
        </Text>
      </Title>
      <AddBikeForm navigation={navigation}/>
    </Content>
  </Container>
);

AddBikeFormScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default AddBikeFormScreen;
