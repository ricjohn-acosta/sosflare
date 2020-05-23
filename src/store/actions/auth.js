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

export function upgradeProfile(username, sessionId, email, password) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    const currentUser = firebase.auth().currentUser
    const uid = getState().firebase.auth.uid
    let credential = firebase.auth.EmailAuthProvider.credential(email, password)

    currentUser.linkWithCredential(credential).then(() => {
      firestore
        .collection("users")
        .doc(uid)
        .set({ user_name: username, flare: sessionId, id: uid })
        .then(() => {
          console.log("USER ADDED TO FIRESTORE")
          dispatch({ type: actions.CHANGE_EMAIL, payload: email })
          dispatch({ type: actions.CONVERT_TO_PERM })
        })
      console.log("Account upgraded to permanent")
    })
  }
}

export function reauthenticate(password, source) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    const currentUser = firebase.auth().currentUser

    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    )
    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        dispatch({ type: actions.AUTH_REAUTHENTICATED, payload: source })
      })
      .catch(err => {
        {
          dispatch({
            type: actions.AUTH_FAIL,
            payload: { error: err.message, source: "reauthentication" },
          })
        }
      })
    console.log("reauthenticated")
  }
}

export function resetReauth() {
  return dispatch => {
    dispatch({ type: actions.RESET_REAUTHENTICATED })
  }
}
export function editProfile(type, input) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    const currentUser = firebase.auth().currentUser

    switch (type) {
      case "saveUsername":
        dispatch({ type: actions.CHANGE_USERNAME, payload: input })
        return currentUser.updateProfile({ displayName: input }).then(data => {
          console.log("USERNAME UPDATED")
        })
      case "saveEmail":
        dispatch({ type: actions.CHANGE_EMAIL, payload: input })
        return currentUser
          .updateEmail(input)
          .then(data => {
            console.log("EMAIL UPDATED")
          })
          .catch(err => {
            dispatch({
              type: actions.AUTH_FAIL,
              payload: { error: err.message, source: "updateEmail" },
            })
          })
      case "savePassword":
        return currentUser
          .updatePassword(input)
          .then(data => {
            dispatch({ type: actions.CHANGE_PASSWORD })
          })
          .catch(err => {
            dispatch({
              type: actions.AUTH_FAIL,
              payload: { error: err.message, source: "updatePassword" },
            })
          })
      default:
        return null
    }
  }
}

export function editEmail(bool) {
  return dispatch => {
    dispatch({ type: actions.HANDLE_EMAIL_MODAL, payload: bool })
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
