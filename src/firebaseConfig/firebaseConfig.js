// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuTumchdXIU6WWrxH8aOetXCBuRS9kDwA",
  authDomain: "chatapp-2a689.firebaseapp.com",
  projectId: "chatapp-2a689",
  storageBucket: "chatapp-2a689.appspot.com",
  messagingSenderId: "1016129555662",
  appId: "1:1016129555662:web:b6e7a077958d529fa2949f",
  measurementId: "G-JMVPG2KZ7V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore(app)