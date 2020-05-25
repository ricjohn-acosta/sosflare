import React, { useEffect } from "react"
import ProfileSnackbar from "./ProfileSnackbar"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

const ProfileSnackbars = ({
  hasUpgraded,
  hasChangedUsername,
  hasChangedEmail,
  hasChangedPassword,
}) => {
  const [open, setOpen] = React.useState(false)
  const [currentDescription, setCurrentDescription] = React.useState("")

  useEffect(() => {
    if (hasChangedUsername) {
      setCurrentDescription("Username changed")
      setInterval(() => {
        setOpen(true)
      }, 1000)
    }
  })

  useEffect(() => {
    if (hasChangedEmail) {
      setCurrentDescription("Email updated")
      setInterval(() => {
        setOpen(true)
      }, 1000)
    }
  })

  useEffect(() => {
    if (hasChangedPassword) {
      setCurrentDescription("Password updated")
      setInterval(() => {
        setOpen(true)
      }, 1000)
    }
  }, [hasChangedPassword])

  // if (hasUpgraded) {
  //   return <ProfileSnackbar description={"Account upgraded"} />
  // }

  // if (hasChangedEmail && hasReauthenticated === "email") {
  //   return <ProfileSnackbar description={"Email changed"} />
  // }

  // if (hasChangedUsername) {
  //   return <ProfileSnackbar description={"Username changed"} />
  // }

  return open ? <ProfileSnackbar description={currentDescription} /> : null

  // if (!hasChangedUsername) {
  //   return null
  // } else {
  //   return <ProfileSnackbar description={"Account upgraded"} />
  // }
}

export default ProfileSnackbars
