import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text } from 'native-base';


const AddBikeForm = ({ navigation }) => (
    <Container>
        <Content>
            <Text>Hello Add Bike Screen!</Text>
            <Button onPress={() =>navigation.push('AddBikeWaiver')}>
                <Text>To bike waiver</Text>
            </Button>
        </Content>
    </Container>
)

AddBikeForm.propTypes = {
    navigation: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default AddBikeForm;
