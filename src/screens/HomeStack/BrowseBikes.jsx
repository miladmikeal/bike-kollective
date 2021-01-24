import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Grid,
    Row,
    Text,
    Spinner
} from 'native-base';
import BrowseBikesMap from '../../components/BrowseBikesMap';

const BrowseBikes = ({navigation}) => {
    const [data, setData] = useState();
    const [err, setErr] = useState();

    // sleep simulates taking time to read from the datastore
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // getBikes will retrieve the bike data from firebase. For now I'm going to send mock data.
    async function getBikes() {
        await sleep(1000);
        return [
            {
                'id': '1',
                'name': 'specialized camber',
                'frame': 'large',
                'style': 'Mountain',
                'rating': 5,
                'latitude': 37.79825,
                'longitude': -122.4424,
                'keywords': '1x,full-sus'
            },
            {
                'id': '2',
                'name': 'giant trance',
                'frame': 'small',
                'style': 'Mountain',
                'rating': 3,
                'latitude': 37.77825,
                'longitude': -122.4224,
                'keywords': '1x,full-sus'
            },
            {
                'id': '3',
                'name': 'giant stance',
                'frame': 'medium',
                'style': 'Mountain',
                'rating': 4,
                'latitude': 37.78425,
                'longitude': -122.4394,
                'keywords': '1x,full-sus'
            }
        ]
    }

    if (!data && !err) {
        getBikes()
            .then((bikes) => {
                setData(bikes)
            })
            .catch((e) => {
                setErr(e)
            })
    }

    if (err) {
        return (
            <Container>
                <Text>Error encountered when trying to retrieve bikes from datastore: {err}</Text>
            </Container>
        )
    }

    if (!data) {
        return  (
            <Container>
                <Spinner/>
            </Container>
        )
    }

    return (
        <Container>
            <Grid>
                <Row>
                    <BrowseBikesMap bikes={data}/>
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
}

BrowseBikes.propTypes = {
    navigation: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default BrowseBikes;
