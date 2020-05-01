// import React from "react"
// import { Paper } from "@material-ui/core"
// import { makeStyles } from "@material-ui/core/styles"
// const useStyles = makeStyles({
//   paper: {
//     minHeight: "100%",
//   },
// })

// const HubBar = () => {
//   const classes = useStyles()

//   return (
//     <>
//       <Paper>test</Paper>
//     </>
//   )
// }

// export default HubBar

import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  wrapper: {

  },
})

const HubBar = () => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.wrapper}>test</Paper>
    </>
  )
}

export default HubBar
