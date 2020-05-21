import React from "react"
import { reauthenticate, editEmail } from "../store/actions/auth"
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
  emailModalView
}) => {
  const [open, setOpen] = React.useState(isOpen)
  const [password, setPassword] = React.useState("")

  const handleInput = e => {
    setPassword(e.target.value)
    console.log(password)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    if (!authError) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  const changeEmail = (
    <Dialog
      open={emailModalView}
      // onClose={() => {handleEmailModal(false)}}
      aria-labelledby="form-dialog-title"
    >
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
          error={authError ? true : false}
          fullWidth
          onChange={handleInput}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {handleEmailModal(false)}} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            reauthenticate(password)
            // editProfile("saveEmail", userEmail)
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
        <Button variant="contained" size="large" onClick={handleClickOpen}>
          Change password
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
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
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reauthenticate: password => dispatch(reauthenticate(password)),
    editProfile: (type, input) => dispatch(editProfile(type, input)),
    handleEmailModal: bool => dispatch(editEmail(bool)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileChangePassword)
