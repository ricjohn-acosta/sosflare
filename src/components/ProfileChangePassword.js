import React, { useEffect } from "react"
import { reauthenticate, resetReauth, editEmail } from "../store/actions/auth"
import { connect } from "react-redux"
import { editProfile } from "../store/actions/auth"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

const ProfileChangePassword = ({
  email,
  userEmail,
  isOpen,
  reauthenticate,
  editProfile,
  authError,
  handleEmailModal,
  emailModalView,
  reauthenticated,
  resetReauth,
  changedPassword
}) => {
  const [open, setOpen] = React.useState(isOpen)
  const [openPassword, setOpenPassword] = React.useState(false)
  const [openNewPassword, setOpenNewPassword] = React.useState(false)
  const [password, setPassword] = React.useState("")

  const handleInput = e => {
    setPassword(e.target.value)
    console.log(password)
  }

  const handleOpenPassword = () => {
    setOpenPassword(true)
  }

  const handleClosePassword = () => {
    setOpenPassword(false)
    if (reauthenticated) {
      setOpenNewPassword(true)
    }
  }

  const handleClose = () => {
    if (reauthenticated) {
      handleEmailModal(false)
    } else {
      handleEmailModal(true)
    }
  }

  // Close modal when user is reauthenticated
  useEffect(() => {
    if (reauthenticated) {
      handleEmailModal(false)
      handleClosePassword()
    }
  })

  // Reset reauthenticated state when reauthenticated
  useEffect(() => {
    if (reauthenticated) {
      resetReauth()
    }
  }, [reauthenticated])

  useEffect(() => {
    if (changedPassword) {
      setOpenNewPassword(false)
    }
  }, [changedPassword])

  const changeEmail = (
    <Dialog open={emailModalView} aria-labelledby="form-dialog-title">
      {console.log("modal state", open)}
      {console.log("user email, ", userEmail)}

      <DialogTitle id="form-dialog-title">
        Confirm identity before updating email
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Enter password</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          error={
            authError && authError.source === "updatePassword" ? true : false
          }
          fullWidth
          onChange={handleInput}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleEmailModal(false)
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            reauthenticate(password)
            handleClose()
          }}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )

  if (email) {
    return changeEmail
  } else {
    return (
      <div>
        <Button variant="contained" size="large" onClick={handleOpenPassword}>
          Change password
        </Button>
        <Dialog
          open={openPassword}
          onClose={handleClosePassword}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Confirm identity before changing password
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Enter password</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              error={authError ? true : false}
              fullWidth
              onChange={handleInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePassword} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                reauthenticate(password)
              }}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openNewPassword}
          onClose={handleClosePassword}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change password</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter new password</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              error={
                authError && authError.source === "updatePassword"
                  ? true
                  : false
              }
              fullWidth
              onChange={handleInput}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenNewPassword(false)
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                editProfile("savePassword", password)
              }}
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    authError: auth.error,
    emailModalView: auth.emailModal,
    reauthenticated: auth.user.reauthenticated,
    changedPassword: auth.user.changedPassword
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reauthenticate: password => dispatch(reauthenticate(password)),
    editProfile: (type, input) => dispatch(editProfile(type, input)),
    handleEmailModal: bool => dispatch(editEmail(bool)),
    resetReauth: () => dispatch(resetReauth()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileChangePassword)
