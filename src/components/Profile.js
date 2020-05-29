import React, { useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
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
import { Redirect } from "@reach/router"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"

const useStyles = makeStyles(theme => ({
  rootWrapper: {
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "5vw",
      marginRight: "5vw",
      height: "75vh",
    },
  },
  navbarBtn: {
    float: "left",
  },
  leftGrid: {},
  rightGrid: {
    padding: "2vh",
  },
}))

const Profile = ({ currentProfile, cardAdded, user, uid }) => {
  useFirestoreConnect([
    {
      collection: "cards",
      doc: uid,
    },
  ])
  const currentCard = useSelector(
    ({ firestore: { data } }) => data.cards && data.cards[uid]
  )

  const classes = useStyles()
  const [currentView, setCurrentView] = React.useState(<ProfileManageAccount />)

  const handleView = view => {
    switch (view) {
      case "Manage account":
        return setCurrentView(<ProfileManageAccount />)
      case "Your flare":
        return setCurrentView(<ProfileManageFlare />)
      case "Link third party apps":
        return setCurrentView(<ProfileThirdParty />)
      default:
        return null
    }
  }

  const loadCurrentProfile = () => {
    if (currentProfile) {
      return currentProfile.length === 1 ? true : false
    }
  }

  

  // return currentProfile ? (
  //   currentProfile.length !== 0 ? (
  //     <div className={classes.rootWrapper}>
  //       <Grid className={classes.rootWrapper} container direction="row">
  //         <Grid
  //           className={classes.leftGrid}
  //           item
  //           container
  //           direction="column"
  //           xs={12}
  //           sm={12}
  //           md={2}
  //           component={Paper}
  //         >
  //           <List>
  //             {["Manage account", "Your flare", "Link third party apps"].map(
  //               (text, index) => (
  //                 <ListItem
  //                   button
  //                   disabled={text === "Link third party apps" ? true : false}
  //                   value={"tests"}
  //                   key={text}
  //                   onClick={() => {
  //                     handleView(text)
  //                   }}
  //                 >
  //                   <ListItemIcon>
  //                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //                   </ListItemIcon>
  //                   <ListItemText primary={text} />
  //                 </ListItem>
  //               )
  //             )}
  //             <Divider />
  //           </List>
  //         </Grid>
  //         <Grid
  //           className={classes.rightGrid}
  //           item
  //           container
  //           direction="column"
  //           xs={12}
  //           sm={12}
  //           md={9}
  //           component={Paper}
  //         >
  //           {currentView}
  //         </Grid>
  //       </Grid>
  //     </div>
  //   ) : (
  //     <Redirect from="/profile" to="/firesos" noThrow />
  //   )
  // ) : (
  //   "LOADING"
  // )

  // if (currentCard) {
    return (
      <div className={classes.rootWrapper}>
        <Grid className={classes.rootWrapper} container direction="row">
          <Grid
            className={classes.leftGrid}
            item
            container
            direction="column"
            xs={12}
            sm={12}
            md={2}
            component={Paper}
          >
            <List>
              {["Manage account", "Your flare", "Link third party apps"].map(
                (text, index) => (
                  <ListItem
                    button
                    disabled={text === "Link third party apps" ? true : false}
                    value={"tests"}
                    key={text}
                    onClick={() => {
                      handleView(text)
                    }}
                  >
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
            xs={12}
            sm={12}
            md={9}
            component={Paper}
          >
            {currentView}
          </Grid>
        </Grid>
      </div>
    )
  // }

  // if (!loadCurrentProfile()) {
  //   return <Redirect from="/profile" to="/firesos" noThrow />
  // }
}

const mapStateToProps = ({ firestore, firebase, auth, cards }) => {
  return {
    user: firebase.auth,
    currentProfile: firestore.ordered.currentProfile,
    cardAdded: cards.error,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "cards",
        where: ["id", "==", props.user.uid],
        storeAs: "currentProfile",
      },
    ]
  })
)(Profile)