// SETUP REDUX SSTORE
import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import reduxThunk from "redux-thunk"
import rootReducer from "./reducers"

// ENHANCE STORE WITH FIREBASE
// import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { getFirebase } from "react-redux-firebase"
import { getFirestore } from "redux-firestore"

// Middlewares
const middlewareEnhancer = applyMiddleware(
  reduxThunk.withExtraArgument({ getFirebase, getFirestore })
)

// Store enhancers
// const rrfEnhancer = reactReduxFirebase(firebase, rrfConfig);
// const reduxFirestoreEnhancer = reduxFirestore(firebase);

// const composeEnhancers =
//   process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : compose

// Finally, create store.
const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer))

export default store
