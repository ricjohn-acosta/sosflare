import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import HubBar from "./HubBar"
import HubCards from "./HubCards"

const useStyles = makeStyles({
  wrapper: {
    marginRight: "10%",
    marginLeft: "10%",
  },
})

const HubContainer = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <HubBar/>
      </div>
    </>
  )
}

export default HubContainer
