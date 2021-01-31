import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { getGeoStore } from './geofirestore';
import Bike from '../../models/Bike';

// getBikes will retrieve the bike data from firebase that is
// within a radiusKm km distance from centerpoint
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
      bikeProperties.distance
    );
    bikes.push(bike);
  });
  return bikes;
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
      bikeProperties.distance
    );
    bikes.push(bike);
  });
    return bikes;
  } catch(err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
};
