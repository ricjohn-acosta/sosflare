import React from "react"
import { upgradeProfile, editProfile, editEmail } from "../store/actions/auth"
import ProfileChangePassword from "./ProfileChangePassword"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
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
  isAnon,
  upgradeProfile,
  isPermanent,
  user,
  editProfile,
  newUsername,
  newEmail,
  reauthenticated,
  handleEmailModal,
  emailModalView,
  currentProfile,
  loadCurrentProfile,
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
        // setEditUser(false)
        // return editProfile(input, username)
        if (!username === "") {
          editProfile(input, username)
        }
        return setEditUser(false)
      case "email":
        console.log("test")
        return setEditEmail(true)
      case "saveEmail":
        editProfile(input, email)
        return setEditEmail(false)
      default:
        return null
    }
  }

  // const handleEmailModal = () => {
  //   setEmailModal(true)
  // }

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

  const renderEmailField = () => {
    if (emailModalView) {
      return (
        <>
          <span className={classes.fieldBtn}>
            {/* <ProfileChangePassword
          email={true}
          userEmail={email}
          isOpen={emailModal}
        /> */}
            <TextField
              variant="outlined"
              size="small"
              type="email"
              placeholder={newEmail ? newEmail : user.email}
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
      )
    } else {
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
    }
  }

  // Checks if is account is temp from firebase and if is permanent from redux state
  const checkIfAnon = () => {
    return isPermanent || !isAnon ? true : false
  }

  const handleEmailField = () => {
    if (checkIfAnon()) {
      //if not reauthenticated show edit
      //if reauthenticated show save
      if (reauthenticated) {
        return (
          <Grid item sm={5}>
            <span className={classes.fieldBtn}>
              <TextField
                variant="outlined"
                size="small"
                type="email"
                placeholder={newEmail ? newEmail : user.email}
                fullWidth
                onChange={e => {
                  handleInput("email", e)
                }}
              />
              {editEmail ? (
                <IconButton
                  onClick={() => {
                    handleEditing("saveEmail")
                    // handleEmailModal()
                  }}
                >
                  <CheckIcon />
                </IconButton>
              ) : null}
            </span>
          </Grid>
        )
      } else {
        return (
          <Grid item sm={5}>
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
          </Grid>
        )
      }
    } else {
      // return initial textfield
      return (
        <Grid item sm={5}>
          <span className={classes.fieldBtn}>
            <TextField
              variant="outlined"
              size="small"
              type="email"
              placeholder={newEmail ? newEmail : user.email}
              fullWidth
              onChange={e => {
                handleInput("email", e)
              }}
            />
            {editEmail ? (
              <IconButton
                onClick={() => {
                  handleEditing("saveEmail")
                  // handleEmailModal()
                }}
              >
                <CheckIcon />
              </IconButton>
            ) : null}
          </span>
        </Grid>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {console.log(currentProfile)}
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
                {!editUser ? (
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
              {emailModalView ? (
                <ProfileChangePassword
                  email={true}
                  userEmail={email}
                  isOpen={emailModalView}
                />
              ) : null}
              <Grid item sm={5}>
                {console.log(checkIfAnon())}
                {console.log(editEmail)}
                {/* {!isAnon && reauthenticated === null && !emailModalView || !editEmail? ( */}
                {checkIfAnon() &&
                reauthenticated === null &&
                !emailModalView &&
                !editEmail ? (
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
                ) : (
                  // <>
                  //   <span className={classes.fieldBtn}>
                  //     {/* <ProfileChangePassword
                  //       email={true}
                  //       userEmail={email}
                  //       isOpen={emailModal}
                  //     /> */}
                  //     <TextField
                  //       variant="outlined"
                  //       size="small"
                  //       type="email"
                  //       placeholder={newEmail ? newEmail : user.email}
                  //       fullWidth
                  //       onChange={e => {
                  //         handleInput("email", e)
                  //       }}
                  //     />
                  //     {editEmail ? (
                  //       <IconButton
                  //         onClick={() => {
                  //           handleEditing("saveEmail")
                  //         }}
                  //       >
                  //         <CheckIcon />
                  //       </IconButton>
                  //     ) : null}
                  //   </span>
                  // </>
                  renderEmailField()
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
                size={"large"}
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

const mapStateToProps = ({ firestore, firebase, auth }) => {
  return {
    authHasLoaded: firebase.auth.isEmpty,
    isAnon: firebase.auth.isAnonymous,
    authError: auth.error,
    reauthenticated: auth.user.reauthenticated,
    isPermanent: auth.isPermanent,
    newUsername: auth.user.username,
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
