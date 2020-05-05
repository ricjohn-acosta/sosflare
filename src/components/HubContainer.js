import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import HubBar from "./HubBar"
import HubCards from "./HubCards"

const useStyles = makeStyles({
  wrapper: {
    marginRight: "10%",
    marginLeft: "10%",
  },
  hubBarContainer: {
    paddingTop: "25px"
  }
})

const HubContainer = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <Grid container direction="row">
          <Grid className={classes.hubBarContainer}item xs={12} lg={4}>
            <HubBar />
            <br />
          </Grid>
          <Grid item xs={12} lg={8}>
            
            <HubCards />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default HubContainer
