import React from "react"
import Grid from "@material-ui/core/Grid"
import DetailsNotFound from "./DetailsNotFound"
import MonsterWeaknesses from "./MonsterWeaknesses"
import { Redirect } from "@reach/router"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Carousel from "react-material-ui-carousel"
import Icon from "@material-ui/core/Icon"

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
  profileDataDividers: {
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
        width: "20vw",
    },
  },
  image: {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    border: "2.5px solid",
    borderRadius: "25px",
  },
  icons: {
    width: "45px",
    height: "45px",
    padding: "0px",
    margin: "0px",
  },
}))

const Details = ({ userDetails }) => {
  const classes = useStyles()
  const profileData = userDetails[0]
  const doubleImages = [
    <img
      className={classes.image}
      src={require(`../images/monsterWeaknesses/Shara Ishvalda1.jpg`)}
      style={{ border: "2.5px solid" }}
    ></img>,
    <img
      className={classes.image}
      src={require(`../images/monsterWeaknesses/Shara Ishvalda2.jpg`)}
      style={{ border: "2.5px solid" }}
    ></img>,
  ]

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
        <Grid item xs={12} sm={12}>
          <Typography variant="h3">
            SOS Details:{" "}
            <Typography
              className={classes.profileData}
              variant="h3"
              component={"span"}
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
              <Icon className={classes.icons}>
                <img
                  className={classes.icons}
                  src={require(`../images/sword.png`)}
                ></img>
              </Icon>
              &nbsp; Target Monster <br />
              <hr className={classes.profileDataDividers} />
              <Typography variant="h6">
                &nbsp;{" "}
                <Typography
                  className={classes.profileData}
                  variant="h6"
                  component="span"
                >
                  {profileData.target_monster}
                </Typography>
              </Typography>
            </Typography>
            <br />
            <Typography variant="h4">
              <Icon className={classes.icons}>
                <img
                  className={classes.icons}
                  src={require(`../images/quest.png`)}
                ></img>
              </Icon>
              &nbsp; Description <br />
              <hr className={classes.profileDataDividers} />
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
              <Icon className={classes.icons}>
                <img
                  className={classes.icons}
                  src={require(`../images/star.png`)}
                ></img>
              </Icon>
              &nbsp; Quest type <br />
              <hr className={classes.profileDataDividers} />
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
              <Icon className={classes.icons}>
                <img
                  className={classes.icons}
                  src={require(`../images/time.png`)}
                ></img>
              </Icon>
              &nbsp; Time commenced <br />
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
            {profileData.target_monster === "Shara Ishvalda" ? (
              <Carousel autoPlay={false} indicators={true}>
                {doubleImages.map(image => (
                  <MonsterWeaknesses image={image} />
                ))}
              </Carousel>
            ) : (
              <img
                className={classes.image}
                src={require(`../images/monsterWeaknesses/${profileData.target_monster}.jpg`)}
              ></img>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Details
