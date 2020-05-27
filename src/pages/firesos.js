import React from "react"
import FireSosPaper from "../components/FireSosPaper"
import Layout from "../components/layout"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import CircularProgress from "@material-ui/core/CircularProgress"

const FireSosPage = ({ uid }) => {
  if (uid) {
    return (
      <Layout>
        <FireSosPaper currentUserId={uid} />
      </Layout>
    )
  } else {
    return <CircularProgress/>
  }
}

const mapStateToProps = ({ firebase }) => {
  return {
    uid: firebase.auth.uid,
  }
}

export default connect(mapStateToProps)(FireSosPage)
