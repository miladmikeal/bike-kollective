import * as firebase from "firebase";
import "firebase/firestore";
import PropTypes from 'prop-types';
import { Alert } from "react-native";
import uuid from 'uuid';
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

// Gets an array of bikes checked out by the user. For our app, this
// array should only have length of 0 or 1.
export const getUserBikes = async (userEmail) => {
  const db = firebase.firestore();
  const bikes = [];

  const snapshot = await db.collection('bikes').where('user_id', '==', userEmail).get();
  snapshot.forEach((bikeDoc) => {
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

  return bikes;
};

getUserBikes.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

// saveBikeImg will save the blob supplied at imgUri
// to firebase storage, and return the download url
// for the image.
export const saveBikeImg = async (imgUri) => {
  const resp = await fetch(imgUri);
  const blob = await resp.blob();
  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();
  const imgUrl = await snapshot.ref.getDownloadURL();
  return imgUrl;
};

saveBikeImg.propTypes = {
  imgUri: PropTypes.string.isRequired,
};
