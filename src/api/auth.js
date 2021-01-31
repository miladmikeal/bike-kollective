import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export const getUserInfo = async (uid) => {
  const db = firebase.firestore();
    const userRef = await db.collection("users")
      .doc(uid)
      .get();

    if (!userRef.exists) {
      Alert.alert('No user data found!')
    }
    return userRef.data();
}

export const signUp = async (email, password, lastName, firstName) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const { currentUser } = firebase.auth();

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
}

// eslint-disable-next-line consistent-return
export const signIn = async (email, password) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const { currentUser } = firebase.auth();

    return getUserInfo(currentUser.uid);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}
