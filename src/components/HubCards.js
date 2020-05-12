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

const HubCards = ({ requested, cards, type, user }) => {
  const classes = useStyles()
  const currentTime = moment()

  const loadNextPage = () => {
    let array = []
    let cardsPerPage = 9
    let cardCount = 0
    // Page 1: i=0, i<=8
    // Page 2: i=9, i<=17
    // Page 3: i=18, i<=26...
    // startAt=0
    if (requested && cards) {
      // let i = 'currentPage * cardsPerPage; i <= 'currentPage * cardsPerPage - 1; i++
      for (let i = 0; i <= 8; i++) {
        if (cards[i]) {
          cardCount++
          console.log(cards.length)
          array.push(
            <HubCard
              username={cards[i].username}
              description={cards[i].description}
              monsterType={cards[i].monster_type}
              platform={cards[i].platform}
              rank={cards[i].rank}
              sessionId={cards[i].session_id}
              targetMonster={cards[i].target_monster}
              monsterImage={require(`../images/monsters/${cards[i].target_monster}.png`)}
              startTime={currentTime.from(cards[i].date_created, true)}
              timestamp={cards[i].timestamp}
            />
          )
        }
      }
    }
    return array
  }
  const loadCards = () => {
    if (requested && cards) {
      return (
        <HubCardsSorter sortBy={type} find={user}>
          {/* {Object.values(cards).map(card => {
            return (
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
                timestamp={card.timestamp}
              />
            )
          })} */}
          {loadNextPage()}
        </HubCardsSorter>
      )
    }
  }

  return (
    <>
      <Paper className={classes.wrapper} elevation={1}>
        <Grid container direction="row" spacing={4}>
          {loadCards()}
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
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    const test = () => {
      if (props.cards !== undefined) {
        console.log(props.cards[props.cards.length - 2])
        return props.cards[props.cards.length - 2]
      }
    }
    test()
    return [
      {
        // collection: "cards",
        // limit: 9,
        // orderBy: ["timestamp", "desc"],
        collection: "cards",
        orderBy: ["timestamp", "desc"],
        limit: 18, // limit: 9(currentPage)
      },
    ]
  })
)(HubCards)
