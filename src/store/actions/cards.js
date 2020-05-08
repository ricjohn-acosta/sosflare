import * as actions from "./actionTypes"
import { signUp } from "./auth"
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

    firestore
      .collection("cards")
      .doc(username)
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
        dispatch(
          signUp("defaultemail@default.com", username, "default", sessionId)
        )
        console.log("CARD ADDED TO DB")
        dispatch({ type: actions.ADD_CARD_SUCCESS })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: actions.ADD_CARD_FAIL, payload: err.message })
      })
    dispatch({ type: actions.ADD_CARD_END })
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
