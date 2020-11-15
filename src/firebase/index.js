import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

let initialized = false;

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

/**
 * Initialize Firestore
 */
export const firestore = firebase.firestore();

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

export const init = () => {
  firestore.settings({
    timestampsInSnapshots: true,
  });
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    window.firebase = firebase;
  }
};

if (!initialized) {
  // init();
  initialized = true;
}

export default firebase;
