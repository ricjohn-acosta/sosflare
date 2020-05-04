import * as actions from "./actionTypes"
import moment from "moment";

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
    const date_created = moment().format();

    firestore
      .collection("cards")
      .doc()
      .set({
        username,
        platform,
        session_id: sessionId,
        rank,
        monster_type: monsterType,
        target_monster: targetMonster,
        description,
        date_created: date_created
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
  }
}
