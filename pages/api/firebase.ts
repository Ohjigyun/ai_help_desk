// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  apiKey: "AIzaSyAq3JBnUh27Jf3AV5142iOx-YCa_pFKW0I",
  authDomain: "ai-support-app.firebaseapp.com",
  projectId: "ai-support-app",
  storageBucket: "ai-support-app.appspot.com",
  messagingSenderId: "910460821917",
  appId: "1:910460821917:web:2589dbb131e3f941b8cf74",
  measurementId: "G-C88EQESNVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

module.exports = {
    auth
}