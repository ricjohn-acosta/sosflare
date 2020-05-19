import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Details from "../components/Details"
import HubContainer from "../components/HubContainer"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const hub = () => {
  return (
    <Layout>
      <Router basepath="/hub">
        {/* <Details path="details/:sessionId" /> */}
        {/* <HubContainer path="/" /> */}
        <HubContainer path="/" />
        <Details path=":username" />
      </Router>
    </Layout>
  )
}

export default hub
