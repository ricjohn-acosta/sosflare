import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const environment = process.env.FIREBASE_CONFIG.projectId
const firebaseConfig;

if(environment === "live-sos-flare") {
   firebaseConfig = {
    apiKey: "AIzaSyAB1i-ulKCLaF_0niwmXw6ciypsPCsdCEw",
    authDomain: "sos-flare.firebaseapp.com",
    databaseURL: "https://sos-flare.firebaseio.com",
    projectId: "sos-flare",
    storageBucket: "sos-flare.appspot.com",
    messagingSenderId: "8242918205",
    appId: "1:8242918205:web:ea5d132abc302eedc5cb54",
    measurementId: "G-N5G3ZTNSCV",
  }
} else {
   firebaseConfig = {
    apiKey: "AIzaSyCLSUUjwdD1WRxi_tCmyNDBwdD8gCYTX4A",
    authDomain: "live-sos-flare.firebaseapp.com",
    databaseURL: "https://live-sos-flare.firebaseio.com",
    projectId: "live-sos-flare",
    storageBucket: "live-sos-flare.appspot.com",
    messagingSenderId: "717986119116",
    appId: "1:717986119116:web:57fdce9405236bd5117169",
    measurementId: "G-XW0BKKWSCD"
  };
}


firebase.initializeApp(firebaseConfig)
firebase.firestore()
export default firebase
