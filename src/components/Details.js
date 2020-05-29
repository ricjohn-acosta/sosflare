import React from "react"
import DetailsNotFound from "./DetailsNotFound"
import Detail from "./Detail"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import Typography from "@material-ui/core/Typography"



const Details = ({ cards, requested, uid}) => {
  const getUserDetails = () => {
    if (cards && requested) {
      return cards.length === 0 ? false : true
    }
  }

  if (getUserDetails()) {
    return <Detail uid={uid} userDetails={cards}/>
  } else {
    return <DetailsNotFound />
  }
}

const mapStateToProps = ({ firestore, firebase }) => {
  return {
    cards: firestore.ordered.currentCardDetail,
    requested: firestore.status.requested,
    uid: firebase.auth.uid
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "cards",
        where: ["username", "==", props.username],
        storeAs: "currentCardDetail",
      },
    ]
  })
)(Details)
