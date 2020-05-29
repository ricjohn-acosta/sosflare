import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import HubCard from "./HubCard"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"

const useStyles = makeStyles(theme => ({
  parentWrapper: {},
  test: {
    width: "100px",
  },
}))

const ProfileManageFlare = ({ uid }) => {
  useFirestoreConnect([
    {
      collection: "cards",
      doc: uid,
    },
  ])
  const currentProfile = useSelector(
    ({ firestore: { data } }) => data.cards && data.cards[uid]
  )
  const classes = useStyles()
  const currentTime = moment()

  const loadCard = () => {
    return (
      <HubCard
        id={currentProfile.id}
        username={currentProfile.username}
        description={currentProfile.description}
        monsterType={currentProfile.monster_type}
        platform={currentProfile.platform}
        rank={currentProfile.rank}
        sessionId={currentProfile.session_id}
        targetMonster={currentProfile.target_monster}
        monsterImage={require(`../images/monsters/${currentProfile.target_monster}.png`)}
        startTime={currentTime.from(currentProfile.date_created, true)}
        timestamp={currentProfile.date_created}
        unixTime={currentProfile.unix_time}
        dateCreated={currentProfile.dateCreated}
      />
    )
  }

  return (
    currentProfile ? <div className={classes.parentWrapper}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Typography variant={"h4"}>Your flare</Typography>
          <hr />
        </Grid>

        <Grid className={classes.test} xs={12} sm={12}>
          {loadCard()}
        </Grid>
      </Grid>
    </div> : <div>Your flare has expired. Please fire a new flare <a href="http://firesosflare.com/firesos">here</a></div>
  )
}

const mapStateToProps = ({ firestore, firebase, auth }) => {
  return {
    currentProfile: firestore.data.currentProfile,
    loadCurrentProfile: firestore.status.requested,
    uid: firebase.auth.uid,
  }
}
export default connect(mapStateToProps)(ProfileManageFlare)
