import * as firebase from 'firebase';
import * as geofirestore from 'geofirestore';
import PropTypes from 'prop-types';
import firebaseConfig from '../../config/firebase.config.js';

const BIKE_COLLECTION_NAME = 'bikes';

// Example usage
/*
const demoBike1 = {
name: 'DELETEME',
frame: 'medium',
style: 'mountain',
coordinates: new firebase.firestore.GeoPoint(37.77825, 122.4224),
keywords: 'air-fork,light',
pic_url: 'https://firebasestorage.googleapis.com/v0/b/bikekollective-434ce.appspot.com/o/IMG_20200315_121358979.jpg?alt=media&token=f343ff6a-cb83-41ab-a63d-8aa94a3eb2fd'
}

const geofirestore = getGeoStore();
saveBike(geofirestore, demoBike1);
*/

// Returns a new geofirstore
// TODO - put this in context?
export function getGeoStore() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const firestore = firebase.firestore();
    return geofirestore.initializeApp(firestore);
}

// Saves a bike to the geostore
export async function saveBike(geoFirestore, bike) {
    return geoFirestore.collection(BIKE_COLLECTION_NAME).add({
        name: bike.name,
        frame: bike.frame,
        style: bike.style,
        coordinates: bike.coordinates,
        keywords: bike.keywords,
        pic_url: bike.pic_url,
        checked_out: false,
        user_id: ''
    });
}

saveBike.propTypes = {
    bike: PropTypes.shape({
        name: PropTypes.string.isRequired,
        frame: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired,
        coordinates: PropTypes.instanceOf(firebase.firestore.GeoPoint),
        keywords: PropTypes.string.isRequired,
        pic_url: PropTypes.string.isRequired
    }).isRequired,
    geoFirestore: PropTypes.instanceOf(geofirestore.GeoFirestore).isRequired
}