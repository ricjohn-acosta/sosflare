import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
  version: {
    marginLeft: "5vw",
    marginRight: "5vw",
    marginTop: "3.5vh",
    color:"white"
  },
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.version}>
      V0.0.1
      <div></div>
    </div>
  )
}

export default Footer
