import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import HubCard from "./HubCard"
import HubCardsSorter from "./HubCardsSorter"
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

const HubCards = ({ requested, cards, type, user, currentPage }) => {
  const classes = useStyles()
  const currentTime = moment()

  const fetchCards = () => {

    if (requested && cards) {
      console.log("test", (currentPage - 1) * cardsPerPage)
      for (
        let i = 0;
        i <= 8;
        i++ 
      ) {
        if (cards[i]) {
          array.push(
            <HubCard
              id={cards[i].id}
              username={cards[i].username}
              description={cards[i].description}
              monsterType={cards[i].monster_type}
              platform={cards[i].platform}
              rank={cards[i].rank}
              sessionId={cards[i].session_id}
              targetMonster={cards[i].target_monster}
              monsterImage={require(`../images/monsters/${cards[i].target_monster}.png`)}
              startTime={currentTime.from(cards[i].date_created, true)}
              timestamp={cards[i].date_created}
              dateCreated={cards[i].dateCreated}
            />
          )
        }
      }
    }
    return array
  }

  const displayCards = () => {
    if (requested && cards) {
      return (
        <HubCardsSorter sortBy={type} find={user}>
          {fetchCards()}
        </HubCardsSorter>
      )
    }
  }

  return (
    <>
      <Paper className={classes.wrapper} elevation={1}>
        <Grid container direction="row" spacing={4}>
          {displayCards()}
        </Grid>
      </Paper>
    </>
  )
}

const mapStateToProps = ({ firestore, cards }) => {
  return {
    cards: firestore.ordered.cards,
    requested: firestore.status.requested,
    type: cards.sortBy,
    user: cards.find,
    lastVisible: cards.lastItem,
    currentPage: cards.currentPage,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    const checkPage = () => {
      if (props.currentPage === 1) {
        return null
      } else {
        return props.lastVisible
      }
    }

    return [
      {
        collection: "cards",
        orderBy: ["target_monster"],
        startAt: checkPage(),
        limit: 10,
      },

    ]
  })
)(HubCards)
