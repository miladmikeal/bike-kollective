import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export const getUserInfo = async (uid) => {
  try {
    const db = firebase.firestore();
    const userRef = await db.collection("users")
      .doc(uid)
      .get();

    if (!userRef.exists) {
      Alert.alert('No user data found!');
    }
    return userRef.data();
  } catch (error) {
    Alert.alert('Error: person not found');
  }
};

export const signUp = async (email, password, lastName, firstName) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const { currentUser } = await firebase.auth();

    const db = firebase.firestore();
    await db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        lastName,
        firstName,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
};

// eslint-disable-next-line consistent-return
export const signIn = async (email, password) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => Alert.alert(err.message));

    const { currentUser } = await firebase.auth();
    if (!currentUser) {
      return new Error('No user found!');
    }

    return getUserInfo(currentUser.uid);
  } catch (err) {
    Alert.alert("Error when signing in!", err.message);
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
};
