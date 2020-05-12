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
    const firestore = getFirebase().firestore()
    const date_created = moment().format()
    const timestamp = new Date()
    const id = Date.now()
    const userId = getState().firebase.auth.uid

    firestore
      .collection("users")
      .where("user_name", "==", username)
      .get()
      .then(data => {
        if (data.empty) {
          dispatch(
            signUp(
              "defaultemail@default.com",
              username,
              "default",
              sessionId,
              id
            )
          )
          firestore
            .collection("cards")
            .doc()
            .set({
              id,
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
            .then(data => {
              console.log(data)

              console.log("CARD ADDED TO DB")
              dispatch({ type: actions.ADD_CARD_SUCCESS })
            })
            .catch(err => {
              console.log(err)
              dispatch({ type: actions.ADD_CARD_FAIL, payload: err.message })
            })
          dispatch({ type: actions.ADD_CARD_END })
        } else {
          console.log("USERNAME TAKEN!")
          dispatch({ type: actions.ADD_CARD_FAIL, payload: "USERNAME TAKEN" })
        }
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
