import * as actions from "./actionTypes"

export function signInAnonymously() {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actions.SIGN_IN_ANON })
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()

    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous
            var uid = user.uid
            console.log(isAnonymous, uid)
          } else {
            console.log("user logged out")
          }
        })
      })
      .catch(function (error) {
        console.log(error.code)
        console.log(error.message)
      })
  }
}
