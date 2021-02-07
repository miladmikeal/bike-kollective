import * as firebase from 'firebase';
import 'firebase/firestore';

// bikeRatings will return the average ratings
// for a given bike specificed by bikeId
export const bikeRatings = async (bikeId) => {
  const db = firebase.firestore();
  const ratings = [];

  const snapshot = await db.collection('ratings').where('bike_id', '==', bikeId).get();
  snapshot.forEach((doc) => {
    ratings.push(parseFloat(doc.data().rating));
  });

  const total = ratings.reduce((accumulator, currentValue) => accumulator + currentValue);
  return total / ratings.length;
};

export default bikeRatings();
