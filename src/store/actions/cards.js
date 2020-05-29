import * as actions from "./actionTypes"
import { createAnonAccount } from "./auth"
import moment from "moment"

export function addCard(
  username,
  platform,
  sessionId,
  rank,
  monsterType,
  targetMonster,
  description,
  checkIfAnon,
  source
) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actions.ADD_CARD_START })
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    const date_created = moment().format("LLLL")
    const timestamp = new Date()
    const unixTime = Date.now()
    const userId = getState().firebase.auth.uid

    const checkIfCardExists = async () => {
      let doc = await firestore
        .collection("cards")
        .where("id", "==", userId)
        .get()
        .then(data => {
          return data
        })
      return doc
    }

    // const getUsername = async () => {
    //   let username = await firestore
    //     .collection("users")
    //     .where("id", "==", userId)
    //     .get("user_name")
    //     .then(data => {
    //       return data
    //     })
    //   return username
    // }

    // console.log(getUsername())
    // console.log(checkIfCardExists())
    firestore
      .collection("users")
      .where("user_name", "==", username)
      .get()
      .then(data => {
        if (data.empty && source === "home") {
          firebase
            .auth()
            .signInAnonymously()
            .then(res => {
              const currentUser = firebase.auth().currentUser
              firestore
                .collection("cards")
                .doc(res.user.uid)
                .set({
                  id: res.user.uid,
                  username,
                  platform,
                  session_id: sessionId,
                  rank,
                  monster_type: monsterType,
                  target_monster: targetMonster,
                  description,
                  date_created: date_created,
                  timestamp,
                  unix_time: unixTime,
                })
                .then(() => {
                  dispatch({
                    type: actions.ADD_CARD_SUCCESS,
                    payload: username,
                  })
                })
                .catch(err => {
                  dispatch({
                    type: actions.ADD_CARD_FAIL,
                    payload: err.message,
                  })
                })
              dispatch({ type: actions.ADD_CARD_END })
            })
            .catch(e => {
              console.log("Error")
            })
        } else if (userId) {
          // if user is authenticated, match userId with a user document, get its username field and then make a new card
          if (!checkIfAnon) {
            firestore
              .collection("users")
              .where("user_name", "==", userId)
              .get()
              .then(data => {
                const currentUser = firebase.auth().currentUser
                if (data.empty) {
                  firestore
                    .collection("cards")
                    .doc(userId)
                    .set({
                      id: userId,
                      username: username,
                      platform,
                      session_id: sessionId,
                      rank,
                      monster_type: monsterType,
                      target_monster: targetMonster,
                      description,
                      date_created: date_created,
                      timestamp,
                      unix_time: unixTime,
                    })
                    .then(() => {
                      dispatch({
                        type: actions.ADD_CARD_SUCCESS,
                        payload: username,
                      })
                    })
                    .catch(err => {
                      dispatch({
                        type: actions.ADD_CARD_FAIL,
                        payload: err.message,
                      })
                    })
                  dispatch({ type: actions.ADD_CARD_END })
                } else {
                  dispatch({
                    type: actions.ADD_CARD_FAIL,
                    payload:
                      "Someone with that username has already fired an SOS!",
                  })
                }
              })
              .catch(e => {
                console.log("Error")
              })
          } else {
            firestore
              .collection("users")
              .where("id", "==", userId)
              .get()
              .then(function (querySnapshot) {
                let existingUsername
                querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots
                  existingUsername = doc.data().user_name
                })
                const currentUser = firebase.auth().currentUser
                firestore
                  .collection("cards")
                  .doc(userId)
                  .set({
                    id: userId,
                    username: existingUsername,
                    platform,
                    session_id: sessionId,
                    rank,
                    monster_type: monsterType,
                    target_monster: targetMonster,
                    description,
                    date_created: date_created,
                    timestamp,
                    unix_time: unixTime,
                  })
                  .then(() => {
                    dispatch({
                      type: actions.ADD_CARD_SUCCESS,
                      payload: username,
                    })
                  })
                  .catch(err => {
                    console.log("Error")
                    dispatch({
                      type: actions.ADD_CARD_FAIL,
                      payload: err.message,
                    })
                  })
                dispatch({ type: actions.ADD_CARD_END })
              })
              // .then(data => {
              //   const currentUser = firebase.auth().currentUser
              //   firestore
              //     .collection("cards")
              //     .doc(userId)
              //     .set({
              //       id: userId,
              //       username: data.user_name,
              //       platform,
              //       session_id: sessionId,
              //       rank,
              //       monster_type: monsterType,
              //       target_monster: targetMonster,
              //       description,
              //       date_created: date_created,
              //       timestamp,
              //       unix_time: unixTime,
              //     })
              //     .then(() => {
              //       console.log("CARD ADDED TO DB")
              //       dispatch({
              //         type: actions.ADD_CARD_SUCCESS,
              //         payload: username,
              //       })
              //     })
              //     .catch(err => {
              //       console.log(err)
              //       dispatch({
              //         type: actions.ADD_CARD_FAIL,
              //         payload: err.message,
              //       })
              //     })
              //   dispatch({ type: actions.ADD_CARD_END })
              // })
              .catch(e => {
                console.log("Error")
              })
          }
        } else {
          dispatch({
            type: actions.ADD_CARD_FAIL,
            payload: "Someone with that username has already fired an SOS!",
          })
        }
      })
  }
}

export function editCard(
  id,
  session_id,
  description,
  target_monster,
  monster_type,
  rank
) {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore()
    const unixTime = Date.now()
    firestore
      .collection("cards")
      .doc(id)
      .update({
        session_id,
        description,
        target_monster,
        monster_type,
        rank,
        date_created: moment().format("LLLL"),
        unix_time: unixTime,
      })
      .then(() => {
        return
      })
  }
}

export function sort(sortType) {
  return dispatch => {
    dispatch({ type: actions.SORT_CARDS, payload: sortType })
  }
}

export function findUser(bool) {
  return dispatch => {
    dispatch({ type: actions.FIND_USER, payload: bool })
  }
}

export function changePage(currentPage) {
  return dispatch => {
    dispatch({ type: actions.CHANGE_PAGE, payload: currentPage })
  }
}

export function loadNextPage(lastItem) {
  return dispatch => {
    dispatch({ type: actions.NEXT_PAGE, payload: lastItem })
  }
}

export function savePrevPageRef(lastItem) {
  return dispatch => {
    dispatch({ type: actions.PREV_PAGE_REF, payload: lastItem })
  }
}
