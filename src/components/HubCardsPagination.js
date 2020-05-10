import React from "react"

const HubCardsPagination = () => {
  const [currentPage, setCurrentPage] = React.useState(1)

  const handleNextPage = event => {
    setCurrentPage(++event.target.value)
  }

  const handlePrevPage = event => {
    setCurrentPage(--event.target.value)
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
      <button value={currentPage} onClick={handleNextPage}>
        next page
      </button>
    </>
  )
}

export default HubCardsPagination
