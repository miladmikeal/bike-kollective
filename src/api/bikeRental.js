/* This file will hande a bike rental interactions for a user. Two hours
will be added to the current time, serving as the due back time. The
user_id, bike_id and return_time will be added to the db. */

import * as firebase from 'firebase';
import 'firebase/firestore';

// This function will add a bike rental to the db, the userId cooresponds
// to the user's email and the bike ID is the unique value created by Firestore
export const createBikeRental = async (userId, bikeId) => {
  const db = firebase.firestore();

  // add two hours to the current time which will be the time the rental is due
  let returnTime = new Date();
  returnTime.setHours(returnTime.getHours() + 2);

  // turn date object into string
  returnTime = returnTime.toString();
  // add rental to db
  await db.collection('rentals').add({
    user_id: userId,
    bike_id: bikeId,
    return_time: returnTime,
  });
};

// This function will return the userId and return time for a rental
// in the form of an object
export const getRentalDetails = async (bikeId) => {
  const db = firebase.firestore();
  const rental = {
    userId: '',
    returnTime: '',
  };
  // query db for the rental's bike return
  const snapshot = await db.collection('rentals').where('bike_id', '==', bikeId).get();
  snapshot.forEach((doc) => {
    rental.userId = doc.data().user_id;
    rental.returnTime = doc.data().return_time;
  });
  // let newDate = new Date(returnTime.toString());

  return rental;
};

// This will delete the document associated with the rental
export const deleteBikeRental = async (bikeId) => {
  const db = firebase.firestore();
  const snapshot = await db.collection('rentals').where('bike_id', '==', bikeId).get();
  let docId = '';
  snapshot.forEach((doc) => {
    docId = doc.id;
  });
  // const snapshot = await rentalRef.where('').where('bike_id', '==', bikeId).get();

  await db.collection('rentals').doc(docId).delete();
};
