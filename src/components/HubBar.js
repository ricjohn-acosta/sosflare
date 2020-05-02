import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  wrapper: {
    marginLeft: "100px",
    marginRight: "100px",
    minHeight: "50vh"
  },
})

const HubBar = () => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.wrapper}>HUB BAR</Paper>
    </>
  )
}

export default HubBar
