import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  TEST_VAR,
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from '@env';

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

export default firebase.initializeApp(firebaseConfig);
