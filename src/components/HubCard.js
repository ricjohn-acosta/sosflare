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
import Tooltip from "@material-ui/core/Tooltip"

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
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      paddingTop: "5px",
      position: "relative",
      left: "25vw",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
      paddingTop: "5px",
      position: "relative",
      right: "20%",
    },
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
  consoleIcons: {
    width: "35px",
    height: "35px",
    margin: "0px",
    float: "left",
  },
  Normal: {
    backgroundColor: "#C8C8C8",
  },
  Tempered: {
    backgroundColor: "#9966FF",
  },
  ArchTempered: {
    backgroundColor: "#FF9900",
  },
}))

const HubCard = ({
  username,
  sessionId,
  targetMonster,
  rank,
  platform,
  assets,
  requested,
  monsterImage,
  monsterType,
  startTime,
}) => {
  const classes = useStyles()
  const [tooltipState, setTooltipState] = React.useState(false)
  const url = monsterImage

  const handletoolTip = () => {
    setTooltipState(true)
  }

  const resetState = () => {
    setTooltipState(false)
  }

  const copyText = () => {
    navigator.clipboard.writeText(sessionId)
  }

  return (
    <Grid item className={classes.card} xs={12} sm={12} md={4}>
      <Card className={classes.cardWrapper}>
        <CardContent className={classes[monsterType]}>
          <Grid container direction="row">
            <Grid item sm={3}>
              <Icon>
                <img
                  className={classes.consoleIcons}
                  src={require(`../images/${platform}.png`)}
                />
              </Icon>
            </Grid>
            <Grid item sm={9}>
              <Typography className={classes.rank}>{rank}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Tooltip
          title="copied session id!"
          placement="top-mid"
          open={tooltipState}
        >
          <CardActionArea
            onClick={() => {copyText(); handletoolTip()}}
            onMouseLeave={resetState}
          >
            <CardMedia
              component="img"
              src={url}
              alt={targetMonster}
              title={targetMonster}
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
                      <span id="sessionId">{sessionId}</span>
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
        </Tooltip>
        <CardContent>
          <Button>See details</Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default HubCard
