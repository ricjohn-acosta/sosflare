import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MailIcon from "@material-ui/icons/Mail"

const useStyles = makeStyles(theme => ({
  rootWrapper: {
    marginLeft: "5vw",
    marginRight: "5vw",
    height: "75vh",
  },
  navbarBtn: {
    float: "left",
  },
  leftGrid: {
    // marginRight: "2.5vw",
  },
  rightGrid: {},
}))

const Profile = () => {
  const classes = useStyles()

  return (
    <div className={classes.rootWrapper}>
      <Grid className={classes.rootWrapper} container direction="row">
        <Grid
          className={classes.leftGrid}
          item
          container
          direction="column"
          sm={2}
          component={Paper}
        >
          <List>
            {["Manage account", "Update Flare", "Link third party apps"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Grid>
        <Grid
          className={classes.rightGrid}
          item
          container
          direction="column"
          sm={9}
          component={Paper}
        >
          Content
        </Grid>
      </Grid>
    </div>
  )
}

export default Profile
