import React from "react"
import { Redirect } from "@reach/router"

const Details = ({ location, sessionId, username }) => {
  return (
    <div>
      {console.log(location)}
      test {sessionId} {username}
    </div>
  )
}

export default Details
