import React from "react"
import { editProfile } from "../store/actions/auth"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import HubCard from "./HubCard"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
  accountTypeWrapper: { display: "flex" },
  permAccount: {
    color: "green",
  },
  tempAccount: {
    color: "red",
  },
  fieldLabels: {
    paddingTop: "5px",
  },
  usernameField: {
    display: "flex",
  },
}))

const ProfileManageAccount = ({
  authHasLoaded,
  isAnon,
  editProfile,
  isPermanent,
}) => {
  const classes = useStyles()
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleInput = (input, e) => {
    switch (input) {
      case "username":
        return setUsername(e.target.value)
      case "email":
        return setEmail(e.target.value)
      case "password":
        return setPassword(e.target.value)
      default:
        return null
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(username)
    console.log(email)
    console.log(password)
    editProfile(username, email, password)
  }

  const hasAuthLoaded = () => {
    if (!isAnon && !authHasLoaded) {
      return true
    } else {
      return false
    }
  }

  const checkIfAnon = () => {
    return isPermanent || hasAuthLoaded() ? (
      <Typography className={classes.permAccount} variant="h5">
        {" "}
        Permanent
      </Typography>
    ) : (
      <Typography className={classes.tempAccount} variant="h5">
        {" "}
        Temporary
      </Typography>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column">
        <Grid item xs={12} sm={12}>
          <Typography variant={"h4"}>
            Change your account information
          </Typography>
          <hr />
        </Grid>
        <Grid container direction="row">
          <Grid container item xs={12} sm={6} direction="column">
            <Typography
              className={classes.accountTypeWrapper}
              variant={"h5"}
              component="div"
            >
              Account status:&nbsp;{checkIfAnon()}
            </Typography>
            <br />
            {/**
             * USERNAME FIELD
             */}
            <Grid container item direction="row">
              <Grid item xs={3} sm={2} md={2}>
                <Typography className={classes.fieldLabels}>
                  Username:{" "}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <TextField
                  variant="outlined"
                  size="small"
                  onChange={e => {
                    handleInput("username", e)
                  }}
                />
              </Grid>
            </Grid>
            <br />
            {/**
             * EMAIL FIELD
             */}
            <Grid container item direction="row">
              <Grid item xs={3} sm={2} md={2}>
                <Typography className={classes.fieldLabels}>Email: </Typography>
              </Grid>
              <Grid item sm={3}>
                <TextField
                  variant="outlined"
                  size="small"
                  type="email"
                  onChange={e => {
                    handleInput("email", e)
                  }}
                />
              </Grid>
            </Grid>
            <br />
            {/**
             * PASSWORD FIELD
             */}
            <Grid container item direction="row">
              <Grid item xs={3} sm={2} md={2}>
                <Typography className={classes.fieldLabels}>
                  Password:{" "}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <TextField
                  variant="outlined"
                  size="small"
                  type="password"
                  onChange={e => {
                    handleInput("password", e)
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Grid
              item
              sm={1}
              component={Button}
              variant="contained"
              type="submit"
            >
              SAVE
            </Grid>
          </Grid>
          <Grid item xs={6}>
            test
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

const mapStateToProps = ({ firebase, auth }) => {
  return {
    authHasLoaded: firebase.auth.isEmpty,
    isAnon: firebase.auth.isAnonymous,
    isPermanent: auth.isPermanent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProfile: (username, email, password) =>
      dispatch(editProfile(username, email, password)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileManageAccount)
