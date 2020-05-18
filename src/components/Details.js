import React from "react"
import DetailsNotFound from "./DetailsNotFound"
import Detail from "./Detail"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import Typography from "@material-ui/core/Typography"



const Details = ({ location, sessionId, cards, requested }) => {
  const getUserDetails = () => {
    if (cards && requested) {
      return cards.length === 0 ? false : true
    }
  }

  if (getUserDetails()) {
    console.log(cards)
    return <Detail userDetails={cards}/>
  } else {
    return <DetailsNotFound />
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    cards: firestore.ordered.currentCardDetail,
    requested: firestore.status.requested,
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
