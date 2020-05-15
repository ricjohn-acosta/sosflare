import React from "react"
import { Link } from "gatsby"
import * as clipboard from "clipboard-polyfill/dist/clipboard-polyfill.promise"
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
import { green } from "@material-ui/core/colors"

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
  editBtn: {
    backgroundColor: "#33FF66",
    color: "black",
    "&:hover": {
      backgroundColor: "#99FF66",
    },
  },
}))

const HubCard = ({
  id,
  username,
  sessionId,
  targetMonster,
  rank,
  platform,
  monsterImage,
  monsterType,
  startTime,
  userCreated,
}) => {
  const classes = useStyles()
  const [tooltipState, setTooltipState] = React.useState(false)
  const url = monsterImage
  const isIOSDevice = navigator.userAgent.match(/ipad|iphone/i)
  const handletoolTip = () => {
    setTooltipState(true)
  }

  const resetState = () => {
    setTooltipState(false)
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
        <Tooltip title="copied session id!" placement="top" open={tooltipState}>
          <CardActionArea
            onClick={() => {
              clipboard.writeText(sessionId)
              handletoolTip()
            }}
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
              <Typography
                component={"span"}
                variant="body2"
                color="textPrimary"
              >
                <List dense>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.icons}>
                      <VpnKeyIcon />
                    </ListItemIcon>
                    Session ID:&nbsp;
                    <Typography
                      id="sessionId"
                      variant="body2"
                      color="textSecondary"
                    >
                      {sessionId}
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.icons}>
                      <FlareIcon />
                    </ListItemIcon>
                    Flare by :&nbsp;
                    <Typography variant="body2" color="textSecondary">
                      {username}
                    </Typography>
                  </ListItem>

                  <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.icons}>
                      <AccessAlarmIcon />
                    </ListItemIcon>
                    In session :&nbsp;
                    <Typography variant="body2" color="textSecondary">
                      {startTime}
                    </Typography>
                  </ListItem>
                </List>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <CardContent>
          {/** Link button to /{sessionId} */}
          <Button component={Link} to={`/hub/${sessionId}`} state={{username:"test"}}>See details</Button>
          &nbsp;
          {userCreated === id ? (
            <Button className={classes.editBtn} variant="contained">
              Edit
            </Button>
          ) : null}
        </CardContent>
      </Card>
      {console.log(Date.now())}
    </Grid>
  )
}

const mapStateToProps = ({ firebase }) => {
  return {
    // userCreated: firebase.profile.id,
    userCreated: firebase.auth.uid,

  }
}

export default connect(mapStateToProps)(HubCard)
