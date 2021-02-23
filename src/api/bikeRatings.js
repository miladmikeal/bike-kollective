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

  // Return null if there were no ratings in the db
  if (ratings.length > 0) {
    return null;
  }

  const total = ratings.reduce((accumulator, currentValue) => accumulator + currentValue);
  return total / ratings.length;
};

// will return the average rating and the number of ratings
// for a given bike specified by bikeId
export const getBikeRatingCountAndAvg = async (bikeId) => {
  const db = firebase.firestore();
  const ratings = [];

  const snapshot = await db.collection('ratings').where('bike_id', '==', bikeId).get();
  snapshot.forEach((doc) => {
    ratings.push(doc.data().rating);
  });

  if (ratings.length === 0) {
    return {
      score: null,
      sample: 0
    };
  }

  const total = ratings.reduce((accumulator, currentValue) => accumulator + currentValue);
  return {
    score: total / ratings.length,
    sample: ratings.length
  };
};

// adds a new rating to the db for the bike specified by id
export const addBikeRating = async (rating, id) => {
  const db = firebase.firestore();

  await db.collection('ratings').add({
    bike_id: id,
    rating,
  });
};
