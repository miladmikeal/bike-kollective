import React, { useState, useContext } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Grid,
    Row,
    Text,
    Spinner,
    H1
} from 'native-base';
import { AuthContext } from '../../context/AuthProvider';
import BrowseBikesMap from '../../components/BrowseBikesMap';
import { signOut } from '../../api/auth';
import { getGeoStore } from '../../api/geofirestore';
import Bike from '../../../models/Bike';
import LocationServices from '../../../utility/location';

const BrowseBikes = ({ navigation }) => {
    const { currentUser } = useContext(AuthContext);
    const [data, setData] = useState();
    const [err, setErr] = useState();
    const [searchRadiusKm, setSearchRadiusKm] = useState(50);
    const [locationGranted, setLocationGranted] = useState(false);
    const [location, setLocation] = useState();

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
        return bikes
    }

    function handlePress() {
        signOut();
        navigation.replace('AuthStack');
    }

    if (!locationGranted) {
        LocationServices.getLocationPermission()
        .then((permission) => setLocationGranted(permission));
    }

    if (!location) {
        LocationServices.getCurrentLocation().then((currentLocation) => {
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            })
        });
    }

    if (location && !data && !err) {
        const centerPoint = new firebase.firestore.GeoPoint(location.latitude, location.longitude);
        const radiusKm = searchRadiusKm;
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
                    <BrowseBikesMap bikes={data} location={location} />
                </Row>
                <Row>
                    {currentUser && (
                        <H1>Hello {currentUser.firstName}</H1>
                    )}
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
