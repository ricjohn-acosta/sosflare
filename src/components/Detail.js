import React from "react"
import Grid from "@material-ui/core/Grid"
import DetailsNotFound from "./DetailsNotFound"
import { Redirect } from "@reach/router"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  rootWrapper: {
    marginLeft: "10vw",
    marginRight: "10vw",
  },
  descriptionBody: {
    marginLeft: "5vw",
    marginRight: "5vw",
    marginTop: "5vh",
  },
  profileData: {
    color: "grey",
  },
}))

const Details = ({ userDetails }) => {
  const classes = useStyles()
  const profileData = userDetails[0]

  const convertToFullWord = rank => {
    switch (rank) {
      case "LR":
        return "Low rank"
      case "HR":
        return "High rank"
      case "MR":
        return "Master rank"
      default:
        return null
    }
  }
  return (
    <div className={classes.rootWrapper}>
      <Grid container direction="column">
        <Grid item sm={12}>
          <Typography variant="h3">
            SOS Details:{" "}
            <Typography
              className={classes.profileData}
              variant="h3"
              component="span"
            >
              {profileData.session_id}
            </Typography>
          </Typography>
          <hr />
        </Grid>
        <Grid
          className={classes.descriptionBody}
          item
          container
          direction="row"
          sm={12}
        >
          <Grid item sm={6}>
            <Typography variant="h4">
              Description <br />
              <hr style={{ width: "20vw" }} />
              <Typography variant="h6">
                &nbsp;{" "}
                <Typography
                  className={classes.profileData}
                  variant="h6"
                  component="span"
                >
                  {profileData.description}
                </Typography>
              </Typography>
            </Typography>
            <br />
            <Typography variant="h4">
              Quest type <br />
              <hr style={{ width: "20vw" }} />
              <Typography variant="h6">
                &nbsp;{" "}
                <Typography
                  className={classes.profileData}
                  variant="h6"
                  component="span"
                >
                  {convertToFullWord(profileData.rank)}
                </Typography>
              </Typography>
            </Typography>
            <br />
            <Typography variant="h4">
              Time commenced <br />
              <hr style={{ width: "20vw" }} />
              <Typography variant="h6">
                &nbsp;{" "}
                <Typography
                  className={classes.profileData}
                  variant="h6"
                  component="span"
                >
                  {profileData.date_created}
                </Typography>
              </Typography>
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h4">Monster weakness</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Details
