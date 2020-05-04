import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import HubCard from "./HubCard"

import Grid from "@material-ui/core/Grid"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
// import Card from "@material-ui/core/Card"
// import CardActionArea from "@material-ui/core/CardActionArea"
// import CardActions from "@material-ui/core/CardActions"
// import CardContent from "@material-ui/core/CardContent"
// import CardMedia from "@material-ui/core/CardMedia"
// import Button from "@material-ui/core/Button"
// import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  wrapper: {
    [theme.breakpoints.up("lg")]: {
      minHeight: "70vh",
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

const HubCards = ({ requested, cards }) => {
  const makeCard = () => {
    if (requested && cards) {
      Object.values(cards).map(card => {
        return (
          <>
            <HubCard
              owner={card.owner}
              description={card.description}
              monsterType={card.monster_type}
              platform={card.platform}
              rank={card.rank}
              sessionId={card.session_id}
              targetMonster={card.target_monster}
            />
          </>
        )
      })
      console.log(Object.values(cards))
    }
  }
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.wrapper} elevation={1}>
        <Grid container direction="row" spacing={4}>
          {requested && cards
            ? Object.values(cards).map(card => {
                return (
                  <>
                    <HubCard
                      owner={card.owner}
                      description={card.description}
                      monsterType={card.monster_type}
                      platform={card.platform}
                      rank={card.rank}
                      sessionId={card.session_id}
                      targetMonster={card.target_monster}
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

const mapStateToProps = ({ firestore, cards }) => {
  return {
    cards: firestore.data.cards,
    requested: firestore.status.requested,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => ["cards"])
)(HubCards)
