import React from "react"
import { reauthenticate } from "../store/actions/auth"
import { connect } from "react-redux"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

const ProfileChangePassword = ({ email, test, reauthenticate }) => {
  const [open, setOpen] = React.useState(test)
  const [password, setPassword] = React.useState("")

  const handleInput = e => {
    setPassword(e.target.value)
    console.log(password)

  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const changeEmail = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
        {console.log("modal state", open)}
      <DialogTitle id="form-dialog-title">
        Confirm identity before updating password.
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Enter password</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          onChange={handleInput}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {reauthenticate(password)}} color="primary">
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
const mapDispatchToProps = dispatch => {
  return {
    reauthenticate: password => dispatch(reauthenticate(password)),
  }
}

export default connect(null, mapDispatchToProps)(ProfileChangePassword)
