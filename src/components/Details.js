import React from "react"
import DetailsNotFound from "./DetailsNotFound"
import Detail from "./Detail"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import Typography from "@material-ui/core/Typography"



const Details = ({ cards, requested, user}) => {
  const getUserDetails = () => {
    if (cards && requested) {
      return cards.length === 0 ? false : true
    }
  }

  if (getUserDetails()) {
    console.log(cards)
    return <Detail user={user} userDetails={cards}/>
  } else {
    return <DetailsNotFound />
  }
}

const mapStateToProps = ({ firestore, firebase }) => {
  return {
    cards: firestore.ordered.currentCardDetail,
    requested: firestore.status.requested,
    user: firebase.auth.uid
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "cards",
        where: ["session_id", "==", props.sessionId],
        storeAs: "currentCardDetail",
      },
    ]
  })
)(Details)
