import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import HubCard from "./HubCard"
import moment from "moment"
import Grid from "@material-ui/core/Grid"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  wrapper: {
    [theme.breakpoints.up("lg")]: {
      minHeight: "70vh",
      padding: "50px",
    },
    [theme.breakpoints.down("md")]: {
      minHeight: "70vh",
    },
  },
  test: {
    width: "auto",
    height: "auto",
    maxWidth: "50%",
    maxHeight: "50%",
    marginLeft: "25%",
    marginRight: "25%",
  },
}))

const HubCards = ({ requested, cards, assets }) => {
  const classes = useStyles()
  const currentTime = moment()


  return (
    <>
      <Paper className={classes.wrapper} elevation={1}>
        <Grid container direction="row" spacing={4}>
          {requested && cards && assets
            ? Object.values(cards).map(card => {
                return (
                  <>
                    <HubCard
                      username={card.username}
                      description={card.description}
                      monsterType={card.monster_type}
                      platform={card.platform}
                      rank={card.rank}
                      sessionId={card.session_id}
                      targetMonster={card.target_monster}
                      monsterImage={require(`../images/monsters/${card.target_monster}.png`)}
                      startTime={currentTime.from(card.date_created, true)}
                    />
                  </>
                )
              })
            : null}
        </Grid>
      </Paper>
    </>
  )
}

const mapStateToProps = ({ firestore }) => {
  return {
    cards: firestore.data.cards,
    assets: firestore.data.assets,
    requested: firestore.status.requested,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [{ collection: "cards" }, { collection: "assets" }])
)(HubCards)
