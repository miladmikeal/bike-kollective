import * as firebase from 'firebase';
import 'firebase/firestore';

// will return the average ratings
// for a given bike specified by bikeId
export const getAvgBikeRatings = async (bikeId) => {
  const db = firebase.firestore();
  const ratings = [];

  const snapshot = await db.collection('ratings').where('bike_id', '==', bikeId).get();
  snapshot.forEach((doc) => {
    ratings.push(doc.data().rating);
  });

  const total = ratings.reduce((accumulator, currentValue) => accumulator + currentValue);
  return total / ratings.length;
};

// adds a new rating to the db for the bike specified by id
export const addBikeRating = async (rating, id) => {
  const db = firebase.firestore();

  await db.collection('ratings').add({
    bike_id: id,
    rating,
  });
};
