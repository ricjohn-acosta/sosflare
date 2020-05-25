import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import HubCard from "./HubCard"

const useStyles = makeStyles(theme => ({
  parentWrapper: {},
  test: {
    width: "100px",
  },
}))

const ProfileManageFlare = ({ currentProfile, loadCurrentProfile }) => {
  const classes = useStyles()
  const currentTime = moment()

  const loadCard = () => {
    if (loadCurrentProfile && currentProfile) {
      return (
        <HubCard
          id={currentProfile[0].id}
          username={currentProfile[0].username}
          description={currentProfile[0].description}
          monsterType={currentProfile[0].monster_type}
          platform={currentProfile[0].platform}
          rank={currentProfile[0].rank}
          sessionId={currentProfile[0].session_id}
          targetMonster={currentProfile[0].target_monster}
          monsterImage={require(`../images/monsters/${currentProfile[0].target_monster}.png`)}
          startTime={currentTime.from(currentProfile[0].date_created, true)}
          timestamp={currentProfile[0].date_created}
          unixTime={currentProfile[0].unix_time}
          dateCreated={currentProfile[0].dateCreated}
        />
      )
    }
  }

  return (
    <div className={classes.parentWrapper}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Typography variant={"h4"}>Your flare</Typography>
          <hr />
        </Grid>

        <Grid className={classes.test} xs={12} sm={12}>
          {loadCard()}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = ({ firestore, firebase, auth }) => {
  return {
    currentProfile: firestore.ordered.currentProfile,
    loadCurrentProfile: firestore.status.requested,
  }
}
export default connect(mapStateToProps)(ProfileManageFlare)
