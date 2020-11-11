import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChGpZS2YkMR63zKQhZAENVOyZ4blDDnvE",
  authDomain: "e-shop-11.firebaseapp.com",
  databaseURL: "https://e-shop-11.firebaseio.com",
  projectId: "e-shop-11",
  storageBucket: "e-shop-11.appspot.com",
  messagingSenderId: "706573506015",
  appId: "1:706573506015:web:79c42e2ded250907be206a",
};

/**
 * Initialize Firebase APP
 */
firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "development") {
  window.firebase = firebase;
}

/**
 * Initialize Firestore
 */
export const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});

/**
 * Initialize Storage
 */
export const storage = firebase.storage();

/**
 * Initialize Auth
 */
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
