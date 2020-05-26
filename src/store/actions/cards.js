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
  description
) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actions.ADD_CARD_START })
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    const date_created = moment().format("LLLL")
    const timestamp = new Date()
    const unixTime = Date.now()
    const userId = getState().firebase.auth.uid

    firestore
      .collection("users")
      .where("user_name", "==", username)
      .get()
      .then(data => {
        if (data.empty) {
          firebase
            .auth()
            .signInAnonymously()
            .then(res => {
              const currentUser = firebase.auth().currentUser
              console.log(res)
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
                  console.log("CARD ADDED TO DB")
                  dispatch({
                    type: actions.ADD_CARD_SUCCESS,
                    payload: username,
                  })
                })
                .catch(err => {
                  console.log(err)
                  dispatch({
                    type: actions.ADD_CARD_FAIL,
                    payload: err.message,
                  })
                })
              dispatch({ type: actions.ADD_CARD_END })
            })
            .catch(e => {
              console.log(e.message)
            })
        } else if (userId) {
          // if user is authenticated, match userId with a user document, get its username field and then make a new card
          return "test"
        } else {
          console.log("USERNAME TAKEN!")
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
        console.log("CARD UPDATED")
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
