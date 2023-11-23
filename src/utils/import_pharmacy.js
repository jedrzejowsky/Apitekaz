import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../config/firebase.config.js"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// const firebase = initializeApp({firebaseConfig});
const firebaseConfig = initializeApp({
    apiKey: process.env.REACT_APP_FirebaseApiKey,
    authDomain: process.env.REACT_APP_FirebaseAuthDomain,
    projectId: process.env.REACT_APP_FirebaseProjectId,
    storageBucket: process.env.REACT_APP_FirebaseStorageBucket,
    messagingSenderId: process.env.REACT_APP_FirebaseMessagingSenderId,
    appId: process.env.REACT_APP_FirebaseAppId,
  });

// const firestore = firebase.firestore();
const firestore = getFirestore(firebaseConfig);
const auth = getAuth(firebaseConfig);


const data = require('src/utils/data/geoPharmacies_0_800.json');
const collectionKey = 'pharmacy'; //nazwa kolekcji

const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

if (data && (typeof data === 'object')) {
  Object.keys(data).forEach(docKey => {
    firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
      console.log('Document success saved');
    }).catch((error) => {
      console.error('Error while adding document: ', error);
    });
  });
}
