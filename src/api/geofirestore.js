import * as firebase from 'firebase';
import * as geofirestore from 'geofirestore';
import firebaseConfig from '../../config/firebase.config.js';

// Returns a new geofirstore
export default function getGeoStore() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const firestore = firebase.firestore();
  return geofirestore.initializeApp(firestore);
}
