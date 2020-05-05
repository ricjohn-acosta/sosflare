import React from "react"
import { Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  wrapper: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "100px",
      marginRight: "100px",
      minHeight: "50vh",
    },

    [theme.breakpoints.down("md")]: {
      minHeight: "10vh",
    },
  },

  hint: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "130px",
      marginRight: "130px",
      minHeight: "25vh",
      borderRadius: "25px",
      padding: "25px",
      backgroundColor: "#fbfbfb",
    },

    [theme.breakpoints.down("md")]: {
      minHeight: "10vh",
      marginLeft: "150px",
      marginRight: "150px",
      padding: "25px",
      backgroundColor: "#fbfbfb",
    },
  },
  divHeader: {
    textAlign: "center",
  },
  divContent: {
    paddingTop: "10px",
    paddingLeft: "35px",
    paddingRight: "35px",
    color: "#404040",
  },
  normalMonster: {
    backgroundColor: "#C8C8C8",
  },
  temperedMonster: {
    backgroundColor: "#9966FF",
  },
  archTemperedMonster: {
    backgroundColor: "#FF9900",
  },
}))

const HubBar = () => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.wrapper}>
        Search specific owner, Filter by monsters, Filter ascending, Filter descending
      </Paper>
      <br />
      <Paper variant="outlined" className={classes.hint}>
        <div className={classes.divHeader}>
          <Typography className={classes.hintHeader} variant="subtitle1">
            Monster types
          </Typography>
        </div>
        <div className={classes.divContent}>
          <div className={classes.normalMonster}>
            <Typography variant="body2">Normal</Typography>{" "}
          </div>
          <br />
          <div className={classes.temperedMonster}>
            <Typography variant="body2">Tempered</Typography>{" "}
          </div>
          <br />
          <div className={classes.archTemperedMonster}>
            <Typography variant="body2">Arch Tempered</Typography>{" "}
          </div>
        </div>
      </Paper>
    </>
  )
}

export default HubBar
