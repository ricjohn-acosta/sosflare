import React from "react"
import FireSosPaper from "../components/FireSosPaper"
import Login from "../components/Login"
import Layout from "../components/layout"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Helmet } from "react-helmet"
import { Redirect } from "@reach/router"

const FireSosPage = ({ uid }) => {
  if (uid) {
    return (
      <Layout>
        <Helmet>
          <title>{"SOS flare | Fire SOS"}</title>
        </Helmet>
        <FireSosPaper currentUserId={uid} />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Helmet>
          <title>{"SOS flare | Fire SOS"}</title>
        </Helmet>
        <Login />
      </Layout>
    )
  }
}

const mapStateToProps = ({ firebase }) => {
  return {
    uid: firebase.auth.uid,
  }
}

export default connect(mapStateToProps)(FireSosPage)
