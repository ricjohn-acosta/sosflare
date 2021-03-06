import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {useEffect} from "react"
import { logOut } from "../store/actions/auth"
import { connect } from "react-redux"
import { AppBar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Alert from "@material-ui/lab/Alert"
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"

const useStyles = makeStyles({
  appBar: {
    background: "rgb(12, 124, 177)",
  },
  login: {
    float: "right",
  },
  headerText: {
    textAlign: "center",
    textOverflow: "hidden",
    whiteSpace: "nowrap",
    margin: 0,
  },
  btnGroup: {
    float: "right",
    marginRight: "5vw",
  },
  login: {
    typography: {
      fontFamily: "Helvetica",
    },
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
})

const Header = ({ siteTitle, uid, isAnon, isPermanent, logout }) => {
  const classes = useStyles()
  const [alertView, setAlertView] = React.useState(true)
  const [logoutState, setLogout] = React.useState(false)

  const handleLogout = () => {
    setLogout(true)
  }

  useEffect(() => {
    if (logoutState) {
      logout()
      setLogout(true)
    }
  }, [logoutState])

  return (
    <header
      style={{
        background: `rgb(12, 124, 177)`,
        marginBottom: `4rem`,
      }}
    >
      <AppBar className={classes.appBar} position="static">
        <Grid container direction={"row"}>
          <Grid item xs={12} sm={4} />
          <Grid item xs={6} sm={4}>
            <h1 className={classes.headerText}>
              <Link to="/" className={classes.link}>
                {siteTitle}
              </Link>
            </h1>
          </Grid>
          <Grid item xs={6} sm={4}>
            <ButtonGroup
              className={classes.btnGroup}
              size="large"
              variant="text"
            >
              {uid || (
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              )}
              {!uid || (
                <Button
                  color="inherit"
                  component="a"
                  href="/"
                  onClick={handleLogout}
                  // onClick={() => {
                  //   window.location.reload(true)
                  //   logout()
                  // }}
                >
                  Logout
                </Button>
              )}
              {!uid || (
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
              )}
            </ButtonGroup>
          </Grid>
        </Grid>
      </AppBar>

      {uid && isAnon && !isPermanent ? (
        <Collapse in={alertView}>
          <Alert
            closeText="{true}"
            severity="error"
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertView(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            You are currently on a temporary account. Click{" "}
            <a href="http://firesosflare.com/profile">here</a> to upgrade your
            account by changing your email and password to be able to link third
            party apps
          </Alert>
        </Collapse>
      ) : null}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const mapStateToProps = ({ firebase, auth }) => {
  return {
    uid: firebase.auth.uid,
    isAnon: firebase.auth.isAnonymous,
    isPermanent: auth.isPermanent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
