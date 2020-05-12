import React from "react"
import { connect } from "react-redux"

const HubCardsPagination = ({ requested, cards }) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  // const [pageCount, setPageCount] = React.useState(1)

  const handleNextPage = event => {
    setCurrentPage(++event.target.value)
  }

  const handlePrevPage = event => {
    setCurrentPage(--event.target.value)
  }

  const checkPageCount = () => {
    if (requested && cards) {
      return Math.trunc(cards.length / 9 + 1)
    }
  }

  // const checkItemCount = () => {
  //   if (requested && cards) {
  //     console.log(Math.trunc(cards.length / 9 + 1))
  //     if (cards.length % 9 === 1) {
  //       return false
  //     } else {
  //       return true
  //     }
  //   }
  // }

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

const mapStateToProps = ({ firestore, cards }) => {
  return {
    cards: firestore.ordered.cards,
    requested: firestore.status.requested,
  }
}

export default connect(mapStateToProps)(HubCardsPagination)
