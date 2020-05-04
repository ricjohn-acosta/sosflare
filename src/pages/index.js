import React from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import FireSosModal from "../components/FireSosModal"

import { makeStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import Hidden from "@material-ui/core/Hidden"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: "25vh",
    minWidth: "30vw",
  },
  box: {
    padding: "50px",
  },
  respondSosBtn: {
    [theme.breakpoints.down("sm")]: {
      color: "black",
      backgroundColor: "#d6f0fd",
    },
    [theme.breakpoints.up("sm")]: {
      float: "left",
      left: "5%",
      padding: "50px",
      color: "black",
      backgroundColor: "#d6f0fd",
    },
  },
  title: {
    marginBottom: "10vh",
  },
  divider: {
    height: "10vh",
  },
  link: {
    textDecoration: "none",
  },
  wrapper: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "20%",
      marginLeft: "20%",
    },
  },
}))

const IndexPage = ({ requested, test1 }) => {
  const classes = useStyles()

  const fetchData = () => {
    if (requested && test1) {
      return <div>{test1.test.test}</div>
    }
  }

  return (
    <Layout>
      <div className={classes.wrapper}>
        <Box className={classes.title}>
          <h1>Hunt with friends!</h1>
          <h3>
            Get other hunters to help you with your hunts by firing an SOS or
            assist your fellow hunters by responding to their SOS!
          </h3>
        </Box>
        <Paper className={classes.paper} elevation={2}>
          <Box component="div" className={classes.box}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <FireSosModal />
              </Grid>
              <Hidden mdDown>
                <div className="divider" />
              </Hidden>
              <Hidden hidden smUp>
                <Grid item xs={12}>
                  <br />
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={6}>
                <Link to="/hub" className={classes.link}>
                  <Button
                    className={classes.respondSosBtn}
                    size="large"
                    variant="outlined"
                    color="primary"
                    disableRipple
                    fullWidth
                  >
                    <h3 className={classes.test}>RESPOND TO SOS</h3>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ firestore, test }) => {
  return {
    test1: firestore.data.test,
    requested: firestore.status.requested,
  }
}

export default compose(
  connect(mapStateToProps)
  // firestoreConnect(props => [{ collection: "test" }])
)(IndexPage)
