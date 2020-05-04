import React from "react"

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
    maxWidth: 320,
  },
  test: {
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
    fontSize: "medium"
  },
}))

const HubCard = ({sessionId, targetMonster, rank}) => {
  const classes = useStyles()

  const url =
    "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/gthumbnails/mhwi-scarred_yian_garuga_icon.png"
  return (
    <Grid item xs={12} sm={12} md={4}>
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
            className={classes.test}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Target: Lizard
            </Typography>
            <Typography variant="body2" color="textPrimary">
              <List dense disableGutters>
                <ListItem className={classes.listItem}>
                  <ListItemIcon className={classes.icons}>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  Session ID:&nbsp;
                  <Typography variant="body3" color="textSecondary">
                    019283
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemIcon className={classes.icons}>
                    <FlareIcon />
                  </ListItemIcon>
                  Flare by :&nbsp;
                  <Typography variant="body3" color="textSecondary">
                    mOOKENTOOKEN
                  </Typography>
                </ListItem>

                <ListItem className={classes.listItem}>
                  <ListItemIcon className={classes.icons}>
                    <AccessAlarmIcon />
                  </ListItemIcon>
                  Time posted :&nbsp;
                  <Typography variant="body3" color="textSecondary">
                    1 hr ago
                  </Typography>
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default HubCard
