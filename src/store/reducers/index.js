// Root reducer
import { combineReducers } from "redux"
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from "redux-firestore"
import cardsReducer from "./cards"
import authReducer from "./auth"

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cards: cardsReducer,
  auth: authReducer
})
