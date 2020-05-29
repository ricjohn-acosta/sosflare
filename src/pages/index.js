import React from "react"
import { Redirect } from "@reach/router"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import FireSos from "../components/FireSos"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography } from "@material-ui/core"
import Hidden from "@material-ui/core/Hidden"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import cards from "../store/reducers/cards"
import { navigate } from "gatsby"
import HubContainer from "../components/HubContainer"

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
    marginLeft: "5vw",
    marginRight: "5vw"
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

  loginInfo: {
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
      paddingRight: "50px",
    },
  },
  paragraph: {
    fontSize: "1.5rem"
  }
}))

const IndexPage = ({ cards, uid }) => {
  const classes = useStyles()

  if (uid) {
    return <Redirect from="/" to="/hub" noThrow />
  } else {
    return (
      <Layout>
        <Helmet>
          <title>SOS Flare</title>
        </Helmet>
        <div className={classes.wrapper}>
          <Box className={classes.title}>
            <h1>Hunt with friends!</h1>
            <p className={classes.paragraph}>
              Get other hunters to help you with your hunts by firing an SOS or
              assist your fellow hunters by responding to their SOS!
            </p>
          </Box>
          <Paper className={classes.paper} elevation={2}>
            <Box component="div" className={classes.box}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <FireSos />
                  <div className={classes.loginInfo}>
                    <Link to="/login">
                      <Typography>or login!</Typography>
                    </Link>
                  </div>
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
}

const mapStateToProps = ({ firebase }) => {
  return {
    uid: firebase.auth.uid,
  }
}

export default connect(mapStateToProps)(IndexPage)
