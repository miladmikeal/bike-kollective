import React from 'react';
import { Container, Content, Button } from 'native-base';


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

export default BrowseBikes;