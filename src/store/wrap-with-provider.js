import React from "react"
import store from "./createStore"
import { Provider } from "react-redux"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"
import { createFirestoreInstance } from "redux-firestore"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import firebase from "../../fire"
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

const THEME = createMuiTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1770, xl: 1920 },
  },
})

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <MuiThemeProvider theme={THEME}>{element}</MuiThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
