import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"

const sortMonster = (a, b) => {
  if (a.props.targetMonster < b.props.targetMonster) {
    return -1
  }
  if (a.props.targetMonster > b.props.targetMonster) {
    return 1
  }
  return 0
}

const sortNewest = (a, b) => {
  if (a.props.timestamp > b.props.timestamp) {
    return 1
  }
  return 0
}

const sortOldest = (a, b) => {
  if (a.props.timestamp < b.props.timestamp) {
    return -1
  }
  return 0
}

const HubCardsSorter = ({ children, sortBy, find }) => {
  const user = React.Children.toArray(children).find(
    card => card.props.username === find
  )
  if (find) {
    if (user) {
      return user
    } else {
      return children
    }
  } else if (sortBy === "monster" || null) {
    return React.Children.toArray(children).sort(sortMonster)
  } else if (sortBy === "newest" || null) {
    const testArray = React.Children.toArray(children).sort(sortNewest)
    console.log(testArray)
    return testArray
  } else if (sortBy === "oldest" || null) {
    return React.Children.toArray(children).sort(sortOldest)
  } else {
    return children
  }
}

export default HubCardsSorter
