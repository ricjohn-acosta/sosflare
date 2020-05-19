import React from "react"
import ProfileManageAccount from "./ProfileManageAccount"
import ProfileManageFlare from "./ProfileManageFlare"
import ProfileThirdParty from "./ProfileThirdParty"
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
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles(theme => ({
  rootWrapper: {
    marginLeft: "5vw",
    marginRight: "5vw",
    height: "75vh",
  },
  navbarBtn: {
    float: "left",
  },
  leftGrid: {},
  rightGrid: {
    paddingTop: "2vh",
    paddingLeft: "2vh",
  },
}))

const Profile = () => {
  const classes = useStyles()
  const [currentView, setCurrentView] = React.useState(<ProfileManageAccount />)

  const handleView = view => {
    switch (view) {
      case "Manage account":
        return setCurrentView(<ProfileManageAccount />)
      case "Update Flare":
        return setCurrentView(<ProfileManageFlare />)
      case "Link third party apps":
        return setCurrentView(<ProfileThirdParty />)
      default:
        return null
    }
  }

  const test = test => {
    console.log(test)
  }

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
                <ListItem button value={"tests"} key={text} onClick={() => {handleView(text)}}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
            <Divider />
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
          {currentView}
        </Grid>
      </Grid>
    </div>
  )
}

export default Profile
