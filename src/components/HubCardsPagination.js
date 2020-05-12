import React from "react"
import { connect } from "react-redux"
import { changePage } from "../store/actions/cards"
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

const HubCardsPagination = ({ requested, cards, changePage }) => {
  const classes = useStyles()
  const [currentPage, setCurrentPage] = React.useState(1)

  const handleNextPage = event => {
    setCurrentPage(++event.currentTarget.value)
    changePage(Number(event.currentTarget.value))
  }

  const handlePrevPage = event => {
    setCurrentPage(--event.currentTarget.value)
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

  // Take into account item count per page; so if cards.length is divisible by 9, disable next page button
  return (
    <>
      {currentPage !== 1 ? (
        <IconButton className={classes.iconButtons}value={currentPage} onClick={handlePrevPage}>
          <ArrowLeftRoundedIcon />
        </IconButton>
      ) : null}
      <Typography> Page {currentPage}</Typography>
      {currentPage < checkPageCount() ? (
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

const mapStateToProps = ({ firestore }) => {
  return {
    cards: firestore.ordered.cards,
    requested: firestore.status.requested,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePage: currentPage => dispatch(changePage(currentPage)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HubCardsPagination)
