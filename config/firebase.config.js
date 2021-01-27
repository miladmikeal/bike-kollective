<<<<<<< HEAD
import * as firebase from 'firebase';
import 'firebase/firestore';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '@env'; // eslint-disable-line
=======
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
  // eslint-disable-next-line import/no-unresolved
} from '@env';
>>>>>>> c148822dc325e6485d7cdc25dcc509e16f0eb3c9

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

export default firebaseConfig;
