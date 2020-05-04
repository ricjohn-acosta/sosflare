import React from "react"
import FireSosModalContent from "./FireSosModalContent"

import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { Paper } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100px",
  },
  fireSosBtn: {
    [theme.breakpoints.down("sm")]: {
      color: "black",
      backgroundColor: "#d6f0fd",
      overflow: "hidden",
    },

    [theme.breakpoints.up("sm")]: {
      float: "right",
      right: "5%",
      padding: "50px",
      color: "black",
      backgroundColor: "#d6f0fd",
      overflow: "hidden",
    },
  },
}))

const FireSosModal = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        className={classes.fireSosBtn}
        size="large"
        variant="outlined"
        color="primary"
        disableRipple
        fullWidth
      >
        <h3>FIRE SOS</h3>
      </Button>
      <Modal
        className={classes.modal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <FireSosModalContent />
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default FireSosModal
