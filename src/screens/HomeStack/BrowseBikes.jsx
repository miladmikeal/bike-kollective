import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import {
    Button,
    Container,
    Grid,
    Row,
    Text,
    Spinner,
    H1
} from 'native-base';
import BrowseBikesMap from '../../components/BrowseBikesMap';
import { logout } from '../../api/auth';

const BrowseBikes = ({ navigation }) => {
    const currentUserUID = firebase.auth().currentUser.uid;
    const [firstName, setFirstName] = useState('');
    const [data, setData] = useState();
    const [err, setErr] = useState();

    useEffect(() => {
        async function getUserInfo() {
            const doc = await firebase
                .firestore()
                .collection('users')
                .doc(currentUserUID)
                .get();

            if (!doc.exists) {
                Alert.alert('No user data found!')
            } else {
                const dataObj = doc.data();
                setFirstName(dataObj.firstName)
            }
        }
        getUserInfo();
    })

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

    function handlePress() {
        logout();
        navigation.replace('AuthStack');
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
        return (
            <Container>
                <Spinner />
            </Container>
        )
    }

    return (
        <Container>
            <Grid>
                <Row>
                    <BrowseBikesMap bikes={data} />
                </Row>
                <Row>
                    <H1>Hello {firstName} with ID: {currentUserUID}</H1>
                </Row>
                <Row>
                    <Grid>
                        <Row>
                            <Text>Hello Bike Browsing Screen!</Text>
                        </Row>
                        <Row>
                            <Button onPress={() => navigation.push('BikeDetails')}>
                                <Text>To Bike Details</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button light onPress={handlePress}>
                                <Text>Logout</Text>
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
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    }).isRequired
}

export default BrowseBikes;
