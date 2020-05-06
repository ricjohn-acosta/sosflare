import React from "react"

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

const HubCardSorter = ({ children, sortBy, find }) => {
  const user = React.Children.toArray(children).find(
    object => object.props.username === find
  )
  if (find) {
    if (user) {
      return user
    } else {
      return children
    }
  } else if (sortBy === "monster") {
    return React.Children.toArray(children).sort(sortMonster)
  } else if (sortBy === "newest") {
    return React.Children.toArray(children).sort(sortNewest)
  } else if (sortBy === "oldest") {
    return React.Children.toArray(children).sort(sortOldest)
  } else {
    return children
  }
}

export default HubCardSorter
