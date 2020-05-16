import React from "react"
import { connect } from "react-redux"
import { changePage, savePrevPageRef, loadNextPage } from "../store/actions/cards"
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
  currPage,
  savePrevPageRef,
  lastMonRef
}) => {
  const classes = useStyles()
  // make this global state
  const [currentPage, setCurrentPage] = React.useState(1)
  let [lastMonsterRef, setRef] = React.useState([])

  const handleNextPage = event => {
    setCurrentPage(++event.currentTarget.value)
    console.log("Current page when pressed next page: ", currentPage)
    loadNextPage(getLastItem())
    // loadNextPage(getLastItem().charAt(0))
    if (lastMonsterRef.indexOf(getLastItem()) === -1) {
      // setRef([...lastMonsterRef, getLastItem()])
      savePrevPageRef(getLastItem())
    }
    // loadPrevPage(prevPageItem)
    changePage(Number(event.currentTarget.value))
    sendToTop()
  }

  const handlePrevPage = event => {
    // console.log(lastMonsterRef[currentPage - 2])
    setCurrentPage(--event.currentTarget.value)
    // loadNextPage(test)
    // loadPrevPage(getFirstItem())
    console.log("Current page: ", currPage)
    loadNextPage(lastMonRef[currPage - 3])
    changePage(Number(event.currentTarget.value))
    sendToTop()
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

  const checkNextPage = () => {
    if (requested && cards) {
      return cards.length === 10 ? true : false
    }
  }

  const sendToTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  return (
    <>
      {console.log(lastMonsterRef)}
      {currPage !== 1 ? (
        <IconButton
          className={classes.iconButtons}
          value={currPage}
          onClick={handlePrevPage}
        >
          <ArrowLeftRoundedIcon />
        </IconButton>
      ) : null}
      <Typography> Page {currPage}</Typography>
      {checkNextPage() ? (
        <IconButton
          className={classes.iconButtons}
          value={currPage}
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
    currPage: cards.currentPage,
    lastMonRef: cards.prevPageRef,
    requested: firestore.status.requested,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePage: currentPage => dispatch(changePage(currentPage)),
    loadNextPage: lastItem => dispatch(loadNextPage(lastItem)),
    savePrevPageRef: lastItem => dispatch(savePrevPageRef(lastItem)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HubCardsPagination)
