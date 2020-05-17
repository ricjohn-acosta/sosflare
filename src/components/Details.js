import React from "react"
import { Redirect } from "@reach/router"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"

const Details = ({ location, sessionId, username }) => {
  return (
    <div>
      {console.log(location)}
      test {sessionId}
    </div>
  )
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
        storeAs: "currentCardDetail"
      },

    ]
  })
)(Details)
