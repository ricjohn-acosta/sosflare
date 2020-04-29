import React from "react"
import store from "./createStore"
import { Provider } from "react-redux"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"
import { createFirestoreInstance } from "redux-firestore"

import firebase from "./fire"
// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
}

const rrfProps = {
  firebase: typeof window !== "undefined" ? firebase : {},
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {element}
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
