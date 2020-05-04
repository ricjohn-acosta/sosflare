import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  wrapper: {
    [theme.breakpoints.up("lg")]: {
      marginRight: "80px",
      minHeight: "70vh",
    },
    [theme.breakpoints.down("md")]: {
      minHeight: "70vh",
    },
  },
}))

const HubCards = () => {
  const classes = useStyles()
  return (
    <>
      <Paper className={classes.wrapper} elevation={1}>
        HUB CARDS
      </Paper>
    </>
  )
}

export default HubCards
