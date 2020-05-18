import React from "react"
import { Link } from "gatsby"
import { lrhrMonsters, mrMonsters } from "../utils/FireSos.js"
import { editCard } from "../store/actions/cards"
import Grid from "@material-ui/core/Grid"
import DetailsNotFound from "./DetailsNotFound"
import MonsterWeaknesses from "./MonsterWeaknesses"
import { Redirect } from "@reach/router"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Carousel from "react-material-ui-carousel"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button"
import Autocomplete from "@material-ui/lab/Autocomplete"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { Paper } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  rootWrapper: {
    marginLeft: "10vw",
    marginRight: "10vw",
  },
  descriptionBody: {
    marginLeft: "5vw",
    marginRight: "5vw",
    marginTop: "3vh",
  },
  profileData: {
    color: "grey",
  },
  profileDataDividers: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "20vw",
    },
  },
  image: {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    border: "2.5px solid",
    borderRadius: "25px",
  },
  icons: {
    width: "45px",
    height: "45px",
    padding: "0px",
    margin: "0px",
  },
  subtitles: {
    display: "inline-flex",
  },
  editBtn: {
    backgroundColor: "#0033CC",
    color: "white",
    "&:hover": {
      backgroundColor: "#0066CC",
    },
  },
  autocomplete: {
    width: "15vw",
    margin: "0px",
  },
  //   leftContainer: {
  //   },
  rightContainer: {
    [theme.breakpoints.up("sm")]: {
      paddingRight: "5vw",
    },
  },
  paper: {
    padding: "20px",
  },
}))

const Detail = ({ user, userDetails, editCard }) => {
  const classes = useStyles()
  const [isEditing, setEditing] = React.useState(false)
  const [description, setDescription] = React.useState(
    userDetails[0].description
  )
  const [targetMonster, setTargetMonster] = React.useState(
    userDetails[0].target_monster
  )
  const [monsterType, setMonsterType] = React.useState(
    userDetails[0].monster_type
  )
  const [rank, setRank] = React.useState(userDetails[0].rank)

  const profileData = userDetails[0]

  const handleEditing = () => {
    setEditing(true)
  }

  const handleSave = () => {
    if (
      description === profileData.description &&
      targetMonster === profileData.target_monster &&
      monsterType === profileData.monster_type &&
      rank === profileData.rank
    ) {
      console.log("didnt update firestore")
      return setEditing(false)
    } else {
      editCard(profileData.id, description, targetMonster, monsterType, rank)
      setEditing(false)
    }
  }

  const handleDescription = e => {
    setDescription(e.target.value)
    console.log(description)
  }

  const handleMonsterType = event => {
    setMonsterType(event.target.value)
  }

  const handleTargetMonster = event => {
    setTargetMonster(event.target.value)
  }

  const handleRank = event => {
    setRank(event.target.value)
  }

  const isLoggedIn = () => {
    if (user === profileData.id) {
      return (
        <Button className={classes.editBtn} onClick={handleEditing}>
          EDIT{" "}
        </Button>
      )
    } else {
      return null
    }
  }

  const specialMonster = [
    <img
      className={classes.image}
      src={require(`../images/monsterWeaknesses/Shara Ishvalda1.jpg`)}
      style={{ border: "2.5px solid" }}
    ></img>,
    <img
      className={classes.image}
      src={require(`../images/monsterWeaknesses/Shara Ishvalda2.jpg`)}
      style={{ border: "2.5px solid" }}
    ></img>,
  ]

  const convertToFullWord = rank => {
    switch (rank) {
      case "LR":
        return "Low rank"
      case "HR":
        return "High rank"
      case "MR":
        return "Master rank"
      default:
        return null
    }
  }

  return (
    <div className={classes.rootWrapper}>
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <Grid item xs={12} sm={12}>
            <Typography variant="h3">
              Session details (id:{" "}
              <Typography
                className={classes.profileData}
                variant="h3"
                component={"span"}
              >
                {profileData.session_id}
              </Typography>
              ) {isEditing ? null : isLoggedIn()}
            </Typography>
            <hr />
          </Grid>
          <Grid
            className={classes.descriptionBody}
            item
            container
            direction="row"
            sm={12}
          >
            <Grid item sm={5}>
              {/**
               * SESSION LEADER
               */}
              <div>
                <div className={classes.subtitles}>
                  <Icon className={classes.icons}>
                    <img
                      className={classes.icons}
                      src={require(`../images/king.png`)}
                    ></img>
                  </Icon>

                  <Typography variant="h4" component={"span"}>
                    &nbsp; Session Leader
                    <br />
                  </Typography>
                </div>
                <br />
                <hr className={classes.profileDataDividers} />
                <Typography variant="h6">
                  &nbsp;{" "}
                  <Typography
                    className={classes.profileData}
                    variant="h6"
                    component="span"
                  >
                    {profileData.username}
                  </Typography>
                </Typography>
              </div>
              <br />

              {/**
               * DESCRIPTION
               */}

              <div>
                <div className={classes.subtitles}>
                  <Icon className={classes.icons}>
                    <img
                      className={classes.icons}
                      src={require(`../images/quest.png`)}
                    ></img>
                  </Icon>
                  <Typography Typography variant="h4">
                    &nbsp; Description <br />
                  </Typography>
                </div>
                <hr className={classes.profileDataDividers} />
                <Typography variant="h6">
                  &nbsp;{" "}
                  <Typography
                    className={classes.profileData}
                    variant="h6"
                    component="span"
                  >
                    {isEditing ? (
                      <TextField
                        placeholder={profileData.description}
                        onChange={handleDescription}
                      />
                    ) : (
                      profileData.description
                    )}
                  </Typography>
                </Typography>
              </div>
              <br />

              {/**
               * TARGET MONSTER
               */}
              <div>
                <div className={classes.subtitles}>
                  <Icon className={classes.icons}>
                    <img
                      className={classes.icons}
                      src={require(`../images/sword.png`)}
                    ></img>
                  </Icon>

                  <Typography variant="h4" component={"span"}>
                    &nbsp; Target Monster
                    <br />
                  </Typography>
                </div>
                <br />
                <hr className={classes.profileDataDividers} />
                <Typography variant="h6">
                  {isEditing ? (
                    <>
                      <FormControl
                        className={classes.autocomplete}
                        variant="filled"
                        size="small"
                      >
                        <InputLabel>Monster type</InputLabel>
                        <Select
                          value={monsterType}
                          onChange={handleMonsterType}
                        >
                          <MenuItem value={"Normal"}>Normal</MenuItem>
                          <MenuItem value={"Tempered"}>Tempered</MenuItem>
                          <MenuItem value={"Arch Tempered"}>
                            Arch Tempered
                          </MenuItem>
                        </Select>
                        <br />
                      </FormControl>
                      <Autocomplete
                        className={classes.autocomplete}
                        // disabled={!rank || !monsterType ? true : false}
                        options={mrMonsters}
                        getOptionLabel={option => option.monster}
                        renderInput={params => {
                          return (
                            <TextField
                              onSelect={handleTargetMonster}
                              {...params}
                              value={targetMonster}
                              label="Choose monster.."
                              placeholder={profileData.target_monster}
                              variant="filled"
                              error={
                                false
                                // checkAutocompleteInput(params.inputProps.value)
                                //   ? false
                                //   : true
                              }
                            />
                          )
                        }}
                      />
                    </>
                  ) : (
                    <Typography
                      className={classes.profileData}
                      variant="h6"
                      component="span"
                    >
                      &nbsp;&nbsp;{profileData.monster_type}{" "}
                      {profileData.target_monster}
                    </Typography>
                  )}
                </Typography>
              </div>
              <br />

              {/**
               * QUEST TYPE
               */}

              <div>
                <div className={classes.subtitles}>
                  <Icon className={classes.icons}>
                    <img
                      className={classes.icons}
                      src={require(`../images/star.png`)}
                    ></img>
                  </Icon>
                  <Typography variant="h4">
                    &nbsp; Quest rank <br />
                  </Typography>
                </div>
                <hr className={classes.profileDataDividers} />
                <Typography variant="h6">
                  {isEditing ? (
                    <FormControl
                      className={classes.autocomplete}
                      variant="filled"
                      size="small"
                    >
                      <InputLabel>Rank</InputLabel>
                      <Select value={rank} onChange={handleRank}>
                        <MenuItem value={"LR"}>Low Rank</MenuItem>
                        <MenuItem value={"HR"}>High Rank</MenuItem>
                        <MenuItem value={"MR"}>Master Rank</MenuItem>
                      </Select>
                      <br />
                    </FormControl>
                  ) : (
                    <Typography
                      className={classes.profileData}
                      variant="h6"
                      component="span"
                    >
                      &nbsp; {convertToFullWord(profileData.rank)}
                    </Typography>
                  )}
                </Typography>
              </div>
              <br />

              {/**
               * TIME COMMENCED
               */}

              <div>
                <div className={classes.subtitles}>
                  <Icon className={classes.icons}>
                    <img
                      className={classes.icons}
                      src={require(`../images/time.png`)}
                    ></img>
                  </Icon>
                  <Typography variant="h4">
                    &nbsp; Time commenced <br />
                  </Typography>
                </div>
                <hr style={{ width: "20vw" }} />
                <Typography variant="h6">
                  &nbsp;{" "}
                  <Typography
                    className={classes.profileData}
                    variant="h6"
                    component="span"
                  >
                    {profileData.date_created}
                  </Typography>
                </Typography>
              </div>
              <br />
            </Grid>
            {/**
             * IMAGE
             */}
            <Grid className={classes.rightContainer} item sm={7}>
              <Typography variant="h4">Monster weakness</Typography>
              {profileData.target_monster === "Shara Ishvalda" ? (
                <Carousel autoPlay={false} indicators={true}>
                  {specialMonster.map(image => (
                    <MonsterWeaknesses image={image} />
                  ))}
                </Carousel>
              ) : (
                <img
                  className={classes.image}
                  src={require(`../images/monsterWeaknesses/${profileData.target_monster}.jpg`)}
                ></img>
              )}
            </Grid>
            <Button
              component={Link}
              className={classes.editBtn}
              onClick={handleSave}
              to={"/hub"}
            >
              BACK TO HUB{" "}
            </Button>
            &nbsp;
            {isEditing ? (
              <Button className={classes.editBtn} onClick={handleSave}>
                SAVE{" "}
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    editCard: (username, description, target_monster, monster_type, rank) =>
      dispatch(
        editCard(username, description, target_monster, monster_type, rank)
      ),
  }
}

export default connect(null, mapDispatchToProps)(Detail)
