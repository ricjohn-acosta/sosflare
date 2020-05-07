import * as actions from "./actionTypes"
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
    const userId = getState().firebase.auth.uid
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    const date_created = moment().format()
    const timestamp = new Date()

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInAnonymously()
          .then(data => {
            console.log(data)
            firestore
              .collection("cards")
              .doc(data.user.uid)
              .set({
                username,
                platform,
                session_id: sessionId,
                rank,
                monster_type: monsterType,
                target_monster: targetMonster,
                description,
                date_created: date_created,
                timestamp,
              })
              .then(() => {
                console.log("CARD ADDED TO DB")
                dispatch({ type: actions.ADD_CARD_SUCCESS })
              })
              .catch(err => {
                console.log(err)
                dispatch({ type: actions.ADD_CARD_FAIL, payload: err.message })
              })
            dispatch({ type: actions.ADD_CARD_END })
          })
          .catch(function (error) {
            console.log(error.code)
            console.log(error.message)
          })
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