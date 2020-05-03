// Root reducer
import { combineReducers } from "redux"
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from "redux-firestore"
import cardsReducer from "./cards"

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cards: cardsReducer,
})
