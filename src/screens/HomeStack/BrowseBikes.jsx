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
import { getGeoStore } from '../../api/geofirestore';
import Bike from '../../../models/Bike';

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

    // getBikes will retrieve the bike data from firebase that is
    // within a radiusKm km distance from centerpoint
    async function getBikes(centerPoint, radiusKm) {    
        const geostore = getGeoStore();
        const query = geostore.collection('bikes').near({
            center: centerPoint,
            radius: radiusKm
        });

        const bikeDocs = await query.get();

        const bikes = [];
        bikeDocs.docs.forEach((bikeDoc) => {
            const bikeProperties = bikeDoc.data();
            const bike = new Bike(
                bikeDoc.id,
                bikeProperties.checked_out,
                bikeProperties.frame,
                bikeProperties.g.geohash,
                bikeProperties.g.geopoint.U,
                bikeProperties.g.geopoint.k,
                bikeProperties.keywords,
                bikeProperties.name,
                bikeProperties.pic_url,
                bikeProperties.style,
                bikeProperties.user_id,
                bikeProperties.distance
                )
            bikes.push(bike);
        });

        console.log(bikes);
        return bikes
    }

    function handlePress() {
        logout();
        navigation.replace('AuthStack');
    }

    if (!data && !err) {
        // TODO - use location data for this
        const centerPoint = new firebase.firestore.GeoPoint(37.78825, -122.4324);
        const radiusKm = 100;
        getBikes(centerPoint, radiusKm)
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
