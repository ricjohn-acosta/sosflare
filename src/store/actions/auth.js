import * as actions from "./actionTypes"

export function signUp(email, username, password, sessionId, id) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: actions.AUTH_START })
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
          .set({ user_name: username, flare: sessionId, id: id })
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

export function upgradeProfile(username, email, password) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    const currentUser = firebase.auth().currentUser
    let credential = firebase.auth.EmailAuthProvider.credential(email, password)

    currentUser.linkWithCredential(credential).then(() => {
      currentUser.updateProfile({ displayName: username }).then(data => {
        console.log("Username updated")
      })
      signUp()
      console.log("Account upgraded to permanent")
      dispatch({ type: actions.CONVERT_TO_PERM })
    })
  }
}

export function logIn(email, password) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actions.AUTH_START })
    const firebase = getFirebase()

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("USER LOGGED IN ")
        dispatch({ type: actions.AUTH_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: actions.AUTH_FAIL, payload: err.message })
      })
    dispatch({ type: actions.AUTH_END })
  }
}

export function logOut() {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("USER SIGNED OUT")
      })
      .catch(err => {
        console.log(err)
      })
  }
}
