import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  wrapper: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "100px",
      marginRight: "100px",
      minHeight: "50vh",
    },

    [theme.breakpoints.down("md")]: {
      minHeight: "10vh",
    },
  },
}))

const HubBar = () => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.wrapper}>HUB BAR</Paper>
    </>
  )
}

export default HubBar
