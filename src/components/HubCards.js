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

const HubCards = ({ requested, cards, type, user, currentPage, test }) => {
  const classes = useStyles()
  const currentTime = moment()

  const fetchCards = () => {
    let array = []
    let cardsPerPage = 9
    // Page 1: i=0, i<=8
    // Page 2: i=9, i<=17
    // Page 3: i=18, i<=26...
    // startAt=0
    if (requested && cards) {
      // let i = 'currentPage * cardsPerPage; i <= 'currentPage * cardsPerPage - 1; i++
      console.log("test", (currentPage - 1) * cardsPerPage)
      for (
        let i = (currentPage - 1) * cardsPerPage;
        i <= currentPage * cardsPerPage - 1;
        i++
      ) // let i = 0; i <= 9; i++
      {
        // for(let i = 9; i <=17; i++){
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
    test: firestore.data,
    currentPage: cards.currentPage,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    // const lastVisible = () => {
    //   return props.cards[props.cards.length-1].target_monster
    // }

    // const checkPage = () => {
    //   if(props.currentPage !== 1) {
    //     return lastVisible()
    //   } else {
    //     return props.cards[0].target_monster
    //   }
    // }

    // const lastVisible = () => {
    //   if (props.requested && props.test) {
    //     // console.log("monster", props.cards[9].target_monster)
    //     // console.log(props.test.cards.mDku0TX3u1VXNAIuOqQk.target_monster)
    //     return props.test.cards.mDku0TX3u1VXNAIuOqQk.target_monster
    //   }
    // }

    let lastVisible;
    if (props.cards) {
      console.log("monster", props.cards[9].target_monster)
      console.log(props.test.cards)
      lastVisible = props.cards[9].target_monster
    }
    console.log(lastVisible)
    let test = "Brute Tigrex"
    return [
      {
        collection: "cards",
        orderBy: ["target_monster"],
        startAt: 0,
        startAfter: lastVisible ,
        limit: 10,
        // limit: 10 * props.currentPage,
      },
    ]
  })
)(HubCards)
