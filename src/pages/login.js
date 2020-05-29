import React from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import { Redirect } from "@reach/router"
import Login from "../components/Login"
import Layout from "../components/layout"

const login = ({uid}) => {
  if (uid) {
    return <Redirect from="/login" to="/hub" noThrow />
  } else {
    return (
      <Layout>
        <Helmet>
          <title>SOS Flare | Login</title>
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

export default connect(mapStateToProps)(login)
