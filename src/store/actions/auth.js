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

    dispatch({ type: actions.CONVERT_TO_PERM_START })
    currentUser
      .linkWithCredential(credential)
      .then(() => {
        firestore
          .collection("users")
          .doc(uid)
          .set({ user_name: username, flare: sessionId, id: uid })
          .then(() => {
            console.log("USER ADDED TO FIRESTORE")
            // dispatch({ type: actions.CHANGE_EMAIL, payload: email })
            dispatch({ type: actions.CONVERT_TO_PERM, payload: email })
          })
        console.log("Account upgraded to permanent")
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: actions.CONVERT_TO_PERM_FAIL, payload: err })
      })
  }
}

export function reauthenticate(password, invokedAt) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    const currentUser = firebase.auth().currentUser

    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    )

    dispatch({ type: actions.AUTH_REAUTHENTICATED_START })
    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        dispatch({ type: actions.AUTH_REAUTHENTICATED, payload: invokedAt })
      })
      .catch(err => {
        {
          dispatch({
            type: actions.AUTH_FAIL,
            payload: {
              error: err.message,
              source: "reauthentication",
              from: invokedAt,
            },
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
    const firestore = getFirebase().firestore()
    const currentUser = firebase.auth().currentUser
    const uid = getState().firebase.auth.uid

    console.log(uid)
    switch (type) {
      case "saveUsername":
        return firestore
          .collection("users")
          .where("user_name", "==", input)
          .get()
          .then(data => {
            if (data.empty) {
              dispatch({ type: actions.CHANGE_USERNAME, payload: input })
              return firestore
                .collection("cards")
                .doc(uid)
                .update({ username: input })
                .then(() => {
                  firestore
                    .collection("users")
                    .doc(uid)
                    .update({ user_name: input })
                    .then(() => {
                      console.log("USERNAME UPDATED")
                      dispatch({ type: actions.CHANGE_USERNAME_SUCCESS})

                    })
                })
            } else {
              dispatch({ type: actions.CHANGE_USERNAME_FAIL })
            }
          })

      case "saveEmail":
        return currentUser
          .updateEmail(input)
          .then(data => {
            console.log("EMAIL UPDATED")
            dispatch({ type: actions.CHANGE_EMAIL, payload: input })
            dispatch({ type: actions.CHANGE_EMAIL_SUCCESS })
          })
          .catch(err => {
            dispatch({
              type: actions.AUTH_FAIL,
              payload: { error: err.message, source: "updateEmail" },
            })
          })
      case "savePassword":
        dispatch({ type: actions.CHANGE_PASSWORD })
        return currentUser
          .updatePassword(input)
          .then(data => {
            dispatch({ type: actions.CHANGE_PASSWORD_SUCCESS })
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
