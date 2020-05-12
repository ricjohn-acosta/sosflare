import React from "react"
import { connect } from "react-redux"
import { changePage } from "../store/actions/cards"

const HubCardsPagination = ({ requested, cards, changePage }) => {
  const [currentPage, setCurrentPage] = React.useState(1)

  const handleNextPage = event => {
    setCurrentPage(++event.target.value)
    changePage(Number(event.target.value))
  }

  const handlePrevPage = event => {
    setCurrentPage(--event.target.value)
    changePage(Number(event.target.value))
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
        <button value={currentPage} onClick={handlePrevPage}>
          previous page
        </button>
      ) : null}
      Page {currentPage}
      {currentPage < checkPageCount() ? (
        <button value={currentPage} onClick={handleNextPage}>
          next page
        </button>
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
