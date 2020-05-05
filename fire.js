import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAB1i-ulKCLaF_0niwmXw6ciypsPCsdCEw",
  authDomain: "sos-flare.firebaseapp.com",
  databaseURL: "https://sos-flare.firebaseio.com",
  projectId: "sos-flare",
  storageBucket: "sos-flare.appspot.com",
  messagingSenderId: "8242918205",
  appId: "1:8242918205:web:ea5d132abc302eedc5cb54",
  measurementId: "G-N5G3ZTNSCV",
}

firebase.initializeApp(firebaseConfig)
firebase.firestore().enablePersistence()

export default firebase
