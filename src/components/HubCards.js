import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  wrapper: {
    marginRight: "80px",
    minHeight: "70vh",
  },
})

const HubCards = () => {
  const classes = useStyles()
  return (
    <>
      <Paper className={classes.wrapper}>HUB CARDS</Paper>
    </>
  )
}

export default HubCards
