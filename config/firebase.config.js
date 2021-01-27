import * as firebase from 'firebase';
import 'firebase/firestore';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '@env'; // eslint-disable-line

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

export default firebase.initializeApp(firebaseConfig);
