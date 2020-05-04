import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Icon from "@material-ui/core/Icon"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { ListItemIcon } from "@material-ui/core"
import FlareIcon from "@material-ui/icons/Flare"
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"

const useStyles = makeStyles(theme => ({
  cardWrapper: {
    [theme.breakpoints.down("md")]: {
      width: "1000px",
    },
  },
  image: {
    width: "auto",
    height: "auto",
    maxWidth: "50%",
    maxHeight: "50%",
    marginLeft: "25%",
    marginRight: "25%",
  },
  listItem: {
    padding: "0",
    margin: "0",
  },
  rank: {
    textAlign: "center",
  },
  icons: {
    marginLeft: "10px",
    minWidth: "35px",
    fontSize: "medium",
  },
  cardContent: {
    padding: "12",
  },
  card: {
    display: "flex",
  },
}))

const HubCard = ({
  username,
  sessionId,
  targetMonster,
  rank,
  assets,
  requested,
  monsterImage,
  startTime,
}) => {
  const classes = useStyles()
  const url = monsterImage

  return (
    <Grid item className={classes.card} xs={12} sm={12} md={4}>
      <Card className={classes.cardWrapper}>
        <CardContent>
          <Typography className={classes.rank}>{rank}</Typography>
        </CardContent>
        <CardActionArea>
          <CardMedia
            component="img"
            src={url}
            alt="Contemplative Reptile"
            title="Contemplative Reptile"
            className={classes.image}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              Target: {targetMonster}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              <List dense disableGutters>
                <ListItem className={classes.listItem}>
                  <ListItemIcon className={classes.icons}>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  Session ID:&nbsp;
                  <Typography variant="body3" color="textSecondary">
                    {sessionId}
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemIcon className={classes.icons}>
                    <FlareIcon />
                  </ListItemIcon>
                  Flare by :&nbsp;
                  <Typography variant="body3" color="textSecondary">
                    {username}
                  </Typography>
                </ListItem>

                <ListItem className={classes.listItem}>
                  <ListItemIcon className={classes.icons}>
                    <AccessAlarmIcon />
                  </ListItemIcon>
                  In session :&nbsp;
                  <Typography variant="body3" color="textSecondary">
                    {startTime}
                  </Typography>
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Button>See details</Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

const mapStateToProps = ({ firestore }) => {
  return {
    assets: firestore.data.assets,
    requested: firestore.status.requested,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [{ collection: "assets" }])
)(HubCard)
