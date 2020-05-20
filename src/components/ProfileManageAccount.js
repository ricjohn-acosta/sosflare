import React from "react"
import { upgradeProfile } from "../store/actions/auth"
import ProfileChangePassword from "./ProfileChangePassword"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import HubCard from "./HubCard"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"
import CheckIcon from "@material-ui/icons/Check"

const useStyles = makeStyles(theme => ({
  accountTypeWrapper: { display: "flex" },
  permAccount: {
    color: "green",
  },
  tempAccount: {
    color: "red",
  },
  fieldLabels: {
    paddingTop: "10px",
  },
  usernameField: {},
  accountValues: {
    color: "grey",
  },
  fieldBtn: {
    display: "flex",
  },
}))

const ProfileManageAccount = ({
  authHasLoaded,
  isAnon,
  upgradeProfile,
  isPermanent,
  user,
}) => {
  const classes = useStyles()
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [editUser, setEditUser] = React.useState(false)
  const [editEmail, setEditEmail] = React.useState(false)

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

  const handleEditing = input => {
    switch (input) {
      case "username":
        return setEditUser(true)
      case "saveUsername":
        return setEditUser(false)
      case "email":
        console.log("test")
        return setEditEmail(true)
      case "saveEmail":
        return setEditEmail(false)
      default:
        return null
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(username)
    console.log(email)
    console.log(password)
    upgradeProfile(username, email, password)
  }

  const hasAuthLoaded = () => {
    if (!isAnon && !authHasLoaded) {
      return true
    } else {
      return false
    }
  }

  const loadUserType = () => {
    return checkIfAnon() ? (
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

  const checkIfAnon = () => {
    return isPermanent || hasAuthLoaded() ? true : false
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
              Account status:&nbsp;{loadUserType()}
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
              <Grid item sm={5}>
                {checkIfAnon() && !editUser ? (
                  <Typography className={classes.accountValues}>
                    {user.displayName}
                    &nbsp;
                    <IconButton
                      onClick={() => {
                        handleEditing("username")
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Typography>
                ) : (
                  <span className={classes.fieldBtn}>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder={user.displayName}
                      onChange={e => {
                        handleInput("username", e)
                      }}
                    />
                    {editUser ? (
                      <IconButton
                        onClick={() => {
                          handleEditing("saveUsername")
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    ) : null}
                  </span>
                )}
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
              <Grid item sm={5}>
                {checkIfAnon() && !editEmail ? (
                  <Typography className={classes.accountValues}>
                    {user.email}
                    <IconButton
                      onClick={() => {
                        handleEditing("email")
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Typography>
                ) : (
                  <>
                    <span className={classes.fieldBtn}>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="email"
                        placeholder={user.email}
                        fullWidth
                        onChange={e => {
                          handleInput("email", e)
                        }}
                      />
                      {editEmail ? (
                        <IconButton
                          onClick={() => {
                            handleEditing("saveEmail")
                          }}
                        >
                          <CheckIcon />
                        </IconButton>
                      ) : null}
                    </span>
                  </>
                )}
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
              <Grid item sm={5}>
                {checkIfAnon() ? (
                  <ProfileChangePassword />
                ) : (
                  <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    fullWidth
                    onChange={e => {
                      handleInput("password", e)
                    }}
                  />
                )}
              </Grid>
            </Grid>
            <br />
            {checkIfAnon() ? null : (
              <Grid
                item
                sm={1}
                component={Button}
                variant="contained"
                type="submit"
              >
                SAVE
              </Grid>
            )}
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
    user: firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upgradeProfile: (username, email, password) =>
      dispatch(upgradeProfile(username, email, password)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileManageAccount)
