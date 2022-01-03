import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, collection} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDEQWW5l0un9Kv_NfGFWx29Ba2dm2pY6_0',
  authDomain: 'twitter-firebase-8acd7.firebaseapp.com',
  projectId: 'twitter-firebase-8acd7',
  storageBucket: 'twitter-firebase-8acd7.appspot.com',
  messagingSenderId: '572448809124',
  appId: '1:572448809124:web:8d6d653329ecf74b484631',
  measurementId: 'G-1PVGP3B64M',
};

initializeApp(firebaseConfig);

const db = getFirestore();
const collectionRef = collection(db, 'tweets');
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db, collectionRef, auth, provider, storage};
