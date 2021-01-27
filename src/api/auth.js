import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export const signUp = async (email, password, lastName, firstName) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const { currentUser } = firebase.auth();

    const db = firebase.firestore();
    db.collection("users")
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

export const signIn = async (email, password) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export const logout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}