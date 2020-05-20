import React from "react"
import Profile from "../components/Profile"
import Login from "../components/Login"
import Layout from "../components/layout"
import { connect } from "react-redux"
import { Redirect } from "@reach/router"

const profile = ({ notLoggedIn }) => {
  if (!notLoggedIn) {
    return (
      <Layout>
        <Profile />
      </Layout>
    )
  } else {
    return <Redirect from="/profile" to="/login" noThrow />
  }
}

const mapStateToProps = ({ firebase }) => {
  return {
    notLoggedIn: firebase.auth.isEmpty,
  }
}

export default connect(mapStateToProps)(profile)
