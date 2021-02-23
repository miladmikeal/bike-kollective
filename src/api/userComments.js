import * as firebase from 'firebase';
import 'firebase/firestore';

// addUserComment will add a comment to the DB specified by ID
export const addUserComment = async (comment, id) => {
  const db = firebase.firestore();

  // if user didn't submit feedback, dont add to db
  if (!comment || comment === '') {
    return;
  }

  await db.collection('comments').add({
    bike_id: id,
    comment,
  });
};

// getUserComments will get the comments for a bike specified by it's ID,
// and return an array of comments
export const getUserComments = async (bikeId) => {
  const db = firebase.firestore();
  const comments = [];

  const snapshot = await db.collection('comments').where('bike_id', '==', bikeId).get();
  snapshot.forEach((doc) => {
    comments.push(doc.data().comment);
  });

  return comments;
};
