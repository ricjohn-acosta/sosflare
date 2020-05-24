import React from "react"
import { Router } from "@reach/router"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Details from "../components/Details"
import HubContainer from "../components/HubContainer"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"



const hub = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>{"SOS Flare | Hub"}</title>
      </Helmet>
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
