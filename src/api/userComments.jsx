import * as firebase from 'firebase';
import 'firebase/firestore';

// This function will add a comment to the DB specified by ID
export const addUserComment = async (comment, id) => {
  const db = firebase.firestore();

  await db.collection('comments').add({
    bike_id: id,
    comment,
  });
};

// TODO: Next Sprint, need more details before implementation
// This function will get the comments for a bike specified by it's ID
export const getUserComment = () => {
  const db = firebase.firestore();
};
