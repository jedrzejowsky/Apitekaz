import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { type } from "@testing-library/user-event/dist/type/index.js";
import fs from "fs";
import { doc, setDoc, addDoc } from "firebase/firestore"; 

// cd src , cd untils, node ./import_pharmacy.js

// change path do json file
const pharmacies = fs.readFileSync("./data/geoPharmacies_7000-7999.json", "utf-8");
if (!pharmacies) throw new Error("Can't read file");
const pharmaciesList = await JSON.parse(pharmacies);

// neet to add credentials manualy env not work
const firebaseConfig = initializeApp({
  apiKey: process.env.REACT_APP_FirebaseApiKey,
  authDomain: process.env.REACT_APP_FirebaseAuthDomain,
  projectId: process.env.REACT_APP_FirebaseProjectId,
  storageBucket: process.env.REACT_APP_FirebaseStorageBucket,
  messagingSenderId: process.env.REACT_APP_FirebaseMessagingSenderId,
  appId: process.env.REACT_APP_FirebaseAppId,
  });

const firestore = getFirestore(firebaseConfig);
const auth = getAuth(firebaseConfig);

const collectionName = 'pharmacy'; //nazwa kolekcji

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


if(pharmaciesList){
pharmaciesList.forEach(async item =>{

  try {
    await addDoc(collection(firestore, collectionName), item)
    await sleep(100).then(() =>{
      console.log('record added');
    });
    
  }
  catch (error) {
    console.error("Error adding document: ", error);
  } 
})
console.log('import data success');
}