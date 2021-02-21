import * as firebase from 'firebase';
import 'firebase/firestore';

/* These functions will check a selected bike in and out from the DB */

// This will set the check_out field to true and set the
// user_id to the id of the authenticated user
export const checkOutBike = async (userEmail, bikeId) => {
  const db = firebase.firestore();
  // get the bike from db
  const bikeRef = db.collection('bikes').doc(bikeId);
  // update user_id to userEmail
  await bikeRef.update({ user_id: userEmail });
  // update checked_out to true
  await bikeRef.update({ checked_out: true });
};

// This will reset the user_id to '' and the
// checkout_out flag to false
export const checkInBike = async (bikeId) => {
  const db = firebase.firestore();
  // get the bike from db
  const bikeRef = db.collection('bikes').doc(bikeId);
  // change user_id to ""
  await bikeRef.update({ user_id: '' });
  // update checkout_out to false
  await bikeRef.update({ checked_out: false });
};
