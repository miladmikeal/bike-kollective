import * as firebase from "firebase";
import "firebase/firestore";
import PropTypes from 'prop-types';
import { Alert } from "react-native";
import * as geofirestore from 'geofirestore';
import getGeoStore from './geofirestore';
import Bike from '../models/Bike';

const BIKE_COLLECTION_NAME = 'bikes';

// getBikes will retrieve the bike data from firebase that is
// within a radiusKm km distance from centerpoint, sort the bikes,
// and return them from nearest to farthest.
export const getBikesWithinRadius = async (centerPoint, radiusKm) => {    
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
      bikeDoc.distance,
      bikeProperties.lock
    );
    bikes.push(bike);
  });
  bikes.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
  return bikes;
};

getBikesWithinRadius.propTypes = {
  centerPoint: PropTypes.instanceOf(firebase.firestore.GeoPoint).isRequired,
  radiusKm: PropTypes.number.isRequired
};


export const getBikes = async () => {
  try {
    const db = firebase.firestore();

    const bikesRef = db.collection("bikes");
    const bikeDocs = await bikesRef.get();
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
        bikeProperties.distance,
        bikeProperties.lock
      );
      bikes.push(bike);
    });
    return bikes;
  } catch(err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
};

// Saves a bike to the geostore
export const saveBike = async (geoFirestore, bike) => (
  geoFirestore.collection(BIKE_COLLECTION_NAME).add({
    name: bike.name,
    frame: bike.frame,
    style: bike.style,
    coordinates: bike.coordinates,
    keywords: bike.keywords,
    pic_url: bike.pic_url,
    checked_out: false,
    user_id: '',
    lock: bike.lock
  })
);

saveBike.propTypes = {
  bike: PropTypes.shape({
    name: PropTypes.string.isRequired,
    frame: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    coordinates: PropTypes.instanceOf(firebase.firestore.GeoPoint),
    keywords: PropTypes.string.isRequired,
    pic_url: PropTypes.string.isRequired,
    lock: PropTypes.number.isRequired
  }).isRequired,
  geoFirestore: PropTypes.instanceOf(geofirestore.GeoFirestore).isRequired
};
