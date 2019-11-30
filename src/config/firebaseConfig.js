import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDuaMtftXVbwdWmUd39v6Uu1n4UgF07DXQ",
    authDomain: "final-project-4ddd5.firebaseapp.com",
    databaseURL: "https://final-project-4ddd5.firebaseio.com",
    projectId: "final-project-4ddd5",
    storageBucket: "final-project-4ddd5.appspot.com",
    messagingSenderId: "507917666022",
    appId: "1:507917666022:web:0f7b6bc8c8d62b66199d27",
    measurementId: "G-73YSW7P6T5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;