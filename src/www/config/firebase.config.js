// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

// // Import functions you need for Google Cloud hosting
// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore } = require('firebase-admin/firestore');
// // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// initializeApp({
//   credential: applicationDefault()
// });

// const db = getFirestore();

export { auth };