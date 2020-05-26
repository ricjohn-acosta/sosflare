import React, { useEffect } from "react"
import {
  upgradeProfile,
  editProfile,
  editEmail,
  resetReauth,
} from "../store/actions/auth"
import moment from "moment"
import ProfileChangePassword from "./ProfileChangePassword"
import ProfileSnackbars from "./ProfileSnackbars"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"

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
  form: {
    minHeight: "100%",
  },
  leftContainer: {
    height: "100%",
  },
  rightContainer: {
    padding: "0px",
  },
}))

const ProfileManageAccount = ({
  isAnon,
  upgradeProfile,
  isPermanent,
  user,
  editProfile,
  newUsername,
  changedUsername,
  newEmail,
  reauthenticated,
  handleEmailModal,
  emailModalView,
  currentProfile,
  loadCurrentProfile,
  resetReauth,
  firebaseUsername,
  changedEmail,
  changedPassword,
  upgradeError,
  changedUsernameError,
  changedEmailError,
  authError,
}) => {
  const classes = useStyles()
  const currentTime = moment()
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
        if (username === "") {
          return setEditUser(false)
        } else {
          editProfile(input, username)
        }
      case "email":
        return setEditEmail(true)
      case "saveEmail":
        // editProfile(input, email)
        // return setEditEmail(false)
        if (email === "") {
          return setEditEmail(false)
        } else {
          editProfile(input, email)
        }
      default:
        return null
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(username)
    console.log(email)
    console.log(password)
    upgradeProfile(
      loadCurrentUsername(),
      loadProfileSessionId(),
      email,
      password
    )
  }

  const handleEmailError = () => {
    if (upgradeError) {
      if (upgradeError.code === "auth/invalid-email") {
        return "Invalid email"
      }
      if (upgradeError.code === "auth/email-already-in-use") {
        return "Email already in use"
      }
      return false
    } else {
      return null
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

  const loadCurrentUsername = () => {
    if (loadCurrentProfile && currentProfile) {
      return currentProfile[0].username
    }
  }

  const loadProfileSessionId = () => {
    if (loadCurrentProfile && currentProfile) {
      return currentProfile[0].session_id
    }
  }

  const renderEmailTextField = () => {
    return (
      <>
        <span className={classes.fieldBtn}>
          <TextField
            variant="outlined"
            size="small"
            type="email"
            placeholder={newEmail ? newEmail : user.email}
            error={changedEmailError ? true : false}
            helperText={changedEmailError ? "Invalid email" : false}
            fullWidth
            onChange={e => {
              handleInput("email", e)
            }}
          />
          {editEmail ? (
            <>
              <IconButton
                onClick={() => {
                  handleEditing("saveEmail")
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton>
                <CloseIcon
                  onClick={() => {
                    setEditEmail(false)
                  }}
                />
              </IconButton>
            </>
          ) : null}
        </span>
      </>
    )
  }

  // if true, account is permanent, if false account is temporary
  const checkIfAnon = () => {
    return isPermanent || !isAnon ? true : false
  }

  useEffect(() => {
    if (!changedEmail) {
      resetReauth()
    }
  }, [changedEmail])

  useEffect(() => {
    if (!changedUsername) {
      setEditUser(false)
    }
  }, [changedUsername])

  const renderEmailTypography = () => {
    console.log("EDIT USER STATE", editUser)
    if (
      (checkIfAnon() && !reauthenticated) ||
      reauthenticated === "password" ||
      !editEmail
    ) {
      // Return typography component
      return (
        <>
          <Typography className={classes.accountValues}>
            {newEmail ? newEmail : user.email}
            <IconButton
              onClick={() => {
                handleEditing("email")
                handleEmailModal(true)
              }}
            >
              <EditIcon />
            </IconButton>
          </Typography>
        </>
      )
      // Else return inputfield component
    } else {
      return renderEmailTextField()
    }
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {console.log(currentProfile)}
      <Grid container direction="column">
        <Grid item xs={12} sm={12}>
          <Typography variant={"h4"}>
            Manage account information and your flare
          </Typography>
          <hr />
        </Grid>
        <Grid item xs={12} sm={12} container direction="row">
          <Grid
            className={classes.leftContainer}
            container
            item
            xs={12}
            sm={6}
            direction="column"
          >
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
              <Grid item xs={3} sm={6} md={2}>
                <Typography className={classes.fieldLabels}>
                  Username:{" "}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                {!editUser && !changedUsername ? (
                  <Typography className={classes.accountValues}>
                    {/* {newUsername ? newUsername : user.displayName} */}
                    {/* {user.displayName || newUsername ? newUsername : user.displayName} */}
                    {newUsername ? newUsername : loadCurrentUsername()}
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
                      placeholder={
                        newUsername ? newUsername : loadCurrentUsername()
                      }
                      error={
                        changedUsernameError
                          ? authError.source === "updatePassword"
                            ? false
                            : true
                          : false
                      }
                      helperText={
                        changedUsernameError
                          ? authError.source === "updatePassword"
                            ? false
                            : "Username taken"
                          : false
                      }
                      onChange={e => {
                        handleInput("username", e)
                      }}
                    />
                    {editUser ? (
                      <>
                        <IconButton
                          onClick={() => {
                            handleEditing("saveUsername")
                          }}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton>
                          <CloseIcon
                            onClick={() => {
                              setEditUser(false)
                            }}
                          />
                        </IconButton>
                      </>
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
              <Grid item xs={3} sm={6} md={2}>
                <Typography className={classes.fieldLabels}>Email: </Typography>
              </Grid>
              {emailModalView ? (
                <ProfileChangePassword
                  email={true}
                  userEmail={email}
                  isOpen={emailModalView}
                />
              ) : null}
              <Grid item sm={6}>
                {console.log(checkIfAnon())}
                {console.log(editEmail)}
                {!checkIfAnon() ? (
                  <>
                    <span className={classes.fieldBtn}>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="email"
                        placeholder={newEmail ? newEmail : user.email}
                        error={handleEmailError() ? true : false}
                        helperText={
                          handleEmailError() ? handleEmailError() : false
                        }
                        fullWidth
                        onChange={e => {
                          handleInput("email", e)
                        }}
                      />
                    </span>
                  </>
                ) : (
                  renderEmailTypography()
                )}
              </Grid>
            </Grid>
            <br />
            {/**
             * PASSWORD FIELD
             */}
            <Grid container item direction="row">
              <Grid item xs={3} sm={6} md={2}>
                <Typography className={classes.fieldLabels}>
                  Password:{" "}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                {checkIfAnon() ? (
                  <ProfileChangePassword />
                ) : (
                  <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    error={
                      upgradeError
                        ? upgradeError.code === "auth/weak-password"
                          ? true
                          : false
                        : null
                    }
                    helperText={
                      upgradeError
                        ? upgradeError.code === "auth/weak-password"
                          ? "Weak password"
                          : null
                        : null
                    }
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
                sm={6}
                xs={12}
                size={"large"}
                component={Button}
                variant="contained"
                type="submit"
              >
                Upgrade
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <ProfileSnackbars
        hasUpgraded={isPermanent}
        hasChangedUsername={changedUsername}
        hasChangedEmail={changedEmail}
        hasChangedPassword={changedPassword}
      />
    </form>
  )
}

const mapStateToProps = ({ firestore, firebase, auth }) => {
  return {
    authHasLoaded: firebase.auth.isEmpty,
    isAnon: firebase.auth.isAnonymous,
    authError: auth.error,
    upgradeError: auth.upgradeAccount.error,
    reauthenticated: auth.user.reauthenticated,
    isPermanent: auth.isPermanent,
    newUsername: auth.user.username,
    firebaseUsername: firebase.auth.displayName,
    changedUsername: auth.user.changedUsername,
    changedEmail: auth.user.changedEmail,
    changedEmailError: auth.user.changedEmailError,
    changedPassword: auth.user.changedPassword,
    changedUsernameError: auth.user.changedUsernameError,
    currentProfile: firestore.ordered.currentProfile,
    loadCurrentProfile: firestore.status.requested,
    newEmail: auth.user.email,
    user: firebase.auth,
    emailModalView: auth.emailModal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upgradeProfile: (username, sessionId, email, password) =>
      dispatch(upgradeProfile(username, sessionId, email, password)),

    editProfile: (type, input) => dispatch(editProfile(type, input)),
    handleEmailModal: bool => dispatch(editEmail(bool)),
    resetReauth: () => dispatch(resetReauth()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "cards",
        where: ["id", "==", props.user.uid],
        storeAs: "currentProfile",
      },
    ]
  })
)(ProfileManageAccount)
