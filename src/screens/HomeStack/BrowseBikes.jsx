import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Text } from 'native-base';


const BrowseBikes = ({ navigation }) => (
    <Container>
        <Content>
            <Text>Hello Bike Browsing Screen!</Text>
            <Button onPress={() =>navigation.push('BikeDetails')}>
                <Text>To Bike Details</Text>
            </Button>
        </Content>
    </Container>
)

BrowseBikes.propTypes = {
    navigation: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default BrowseBikes;
