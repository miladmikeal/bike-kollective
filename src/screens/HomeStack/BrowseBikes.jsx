import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import {
    Button,
    Col,
    Container,
    Grid,
    Row,
    Text
} from 'native-base';

const BrowseBikes = ({ navigation }) => (
    <Container>
        <Grid>
            <Row>
                <MapView
                    style={{
                        flex: 1
                    }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker
                        coordinate={{latitude: 37.78825, longitude: -122.4324}}
                    />
                </MapView>
            </Row>
            <Row>
                <Grid>
                    <Row>
                        <Text>Hello Bike Browsing Screen!</Text>
                    </Row>
                    <Row>
                        <Button onPress={() =>navigation.push('BikeDetails')}>
                            <Text>To Bike Details</Text>
                        </Button>
                    </Row>
                </Grid>
            </Row>
        </Grid>
    </Container>
)

BrowseBikes.propTypes = {
    navigation: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default BrowseBikes;
