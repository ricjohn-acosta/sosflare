import React from "react"
import { Helmet } from "react-helmet"
import Profile from "../components/Profile"
import Login from "../components/Login"
import Layout from "../components/layout"
import { connect } from "react-redux"
import { Redirect } from "@reach/router"

const profile = ({ user }) => {
  if (user) {
    return (
      <Layout>
        <Helmet>
          <title>{"SOS flare | Profile"}</title>
        </Helmet>
        <Profile uid={user} />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Login />
      </Layout>
    )
  }
}

const mapStateToProps = ({ firebase }) => {
  return {
    user: firebase.auth.uid,
  }
}

export default connect(mapStateToProps)(profile)
