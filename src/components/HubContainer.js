import React from "react"
import { Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import InfoIcon from "@material-ui/icons/Info"
import Icon from "@material-ui/core/Icon"
import HubBar from "./HubBar"
import HubCards from "./HubCards"
import HubCardsPagination from "./HubCardsPagination"

const useStyles = makeStyles({
  wrapper: {
    marginRight: "10%",
    marginLeft: "10%",
  },
  hubBarContainer: {
    paddingTop: "25px",
  },
  hintContainer: {
    display: "flex",
  },
})

const HubContainer = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <Grid container direction="row">
          <Grid className={classes.hubBarContainer} item xs={12} lg={4}>
            <HubBar />
            <br />
          </Grid>
          <Grid item xs={12} lg={8}>
            <div className={classes.hintContainer}>
              <Icon>
                <InfoIcon fontSize={"small"} />
              </Icon>
              <Typography variant="caption">
                Clicking a card copies the session id!
              </Typography>
            </div>
            <HubCards />
            {/*Pagination component is here*/}
            <HubCardsPagination />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default HubContainer
