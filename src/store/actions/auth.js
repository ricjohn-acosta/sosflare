import * as actions from "./actionTypes"

export function signUp(email, username, password, sessionId) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: actions.AUTH_START, payload: true })
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const currentUser = firebase.auth().currentUser
        currentUser.updateProfile({ displayName: username }).then(() => {
          console.log("DISPLAY NAME SET")
        })
        firestore
          .collection("users")
          .doc(res.user.uid)
          .set({ user_name: username, flare: sessionId })
          .then(() => {
            console.log("USER ADDED TO FIRESTORE")
          })
        dispatch({ type: actions.AUTH_SUCCESS })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: actions.AUTH_FAIL, payload: err.message })
      })
    dispatch({ type: actions.AUTH_END })
  }
}
