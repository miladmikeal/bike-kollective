import * as firebase from 'firebase';
import * as geofirestore from 'geofirestore';
import firebaseConfig from '../../config/firebase.config.js';

// TODO - remove these comments
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
export default function getGeoStore() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const firestore = firebase.firestore();
  return geofirestore.initializeApp(firestore);
}
