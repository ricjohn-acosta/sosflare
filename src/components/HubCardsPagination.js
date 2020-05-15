import React from "react"
import { connect } from "react-redux"
import { changePage, loadPrevPage, loadNextPage } from "../store/actions/cards"
import { Typography, Button } from "@material-ui/core"
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded"
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded"
import { Icon } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({
  iconButtons: {
    padding: "0px",
  },
}))

const HubCardsPagination = ({
  requested,
  cards,
  changePage,
  loadNextPage,
  loadPrevPage,
  prevPageItem,
  test,
}) => {
  const classes = useStyles()
  const [currentPage, setCurrentPage] = React.useState(1)
  let [lastMonsterRef, setRef] = React.useState([])

  const handleNextPage = event => {
    setCurrentPage(++event.currentTarget.value)
    console.log("Current page when pressed next page: ", currentPage)
    loadNextPage(getLastItem())
    if (lastMonsterRef.indexOf(getLastItem()) === -1) {
      setRef([...lastMonsterRef, getLastItem()])
    }
    // loadPrevPage(prevPageItem)
    changePage(Number(event.currentTarget.value))
  }

  const handlePrevPage = event => {
    // console.log(lastMonsterRef[currentPage - 2])
    setCurrentPage(--event.currentTarget.value)
    // loadNextPage(test)
    // loadPrevPage(getFirstItem())
    console.log("Current page: ", currentPage)
    loadNextPage(lastMonsterRef[currentPage-3])
    changePage(Number(event.currentTarget.value))
  }

  const checkPageCount = () => {
    if (requested && cards) {
      console.log("number of cards in array: ", cards.length)
      console.log(
        "number of pages: ",
        cards.length % 9 === 0
          ? cards.length / 9
          : Math.trunc(cards.length / 9 + 1)
      )
      return cards.length % 9 === 0
        ? cards.length / 9
        : Math.trunc(cards.length / 9 + 1)
    }
  }

  const getLastItem = () => {
    if (requested && cards) {
      return cards[8].target_monster
    }
  }

  const getFirstItem = () => {
    if (requested && cards) {
      return cards[0].target_monster
    }
  }

  // Take into account item count per page; so if cards.length is divisible by 9, disable next page button
  return (
    <>
      {console.log(lastMonsterRef)}
      {currentPage !== 1 ? (
        <IconButton
          className={classes.iconButtons}
          value={currentPage}
          onClick={handlePrevPage}
        >
          <ArrowLeftRoundedIcon />
        </IconButton>
      ) : null}
      <Typography> Page {currentPage}</Typography>
      {currentPage ? (
        <IconButton
          className={classes.iconButtons}
          value={currentPage}
          onClick={handleNextPage}
        >
          <ArrowRightRoundedIcon />
        </IconButton>
      ) : null}
    </>
  )
}

const mapStateToProps = ({ firestore, cards }) => {
  return {
    cards: firestore.ordered.cards,
    prevPageItem: cards.lastItem,
    test: cards.firstItem,
    requested: firestore.status.requested,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePage: currentPage => dispatch(changePage(currentPage)),
    loadNextPage: lastItem => dispatch(loadNextPage(lastItem)),
    loadPrevPage: firstItem => dispatch(loadPrevPage(firstItem)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HubCardsPagination)
