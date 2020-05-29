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
  leftContainer: { paddingRight: "30px" },
  rightContainer: {
    [theme.breakpoints.up("sm")]: {
      paddingRight: "5vw",
    },
  },
  paper: {
    padding: "20px",
  },
}))

const Detail = ({ uid, userDetails, editCard }) => {
  const classes = useStyles()
  const profileData = userDetails[0]

  const [isEditing, setEditing] = React.useState(false)
  const [sessionID, setSessionID] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [targetMonster, setTargetMonster] = React.useState("")
  const [monsterType, setMonsterType] = React.useState("")
  const [rank, setRank] = React.useState("")
  const [autoCompleteError, setAutoCompleteState] = React.useState(false)

  const handleEditing = () => {
    setEditing(true)
  }

  const handleSave = () => {
    if (
      sessionID === "" &&
      description === "" &&
      targetMonster === "" &&
      monsterType === "" &&
      rank === ""
    ) {
      return setEditing(false)
    } else {
      editCard(
        profileData.id,
        checkIfEmpty("sessionID"),
        checkIfEmpty("description"),
        checkIfEmpty("targetMonster"),
        checkIfEmpty("monsterType"),
        checkIfEmpty("rank")
      )
      setEditing(false)
    }
  }
  const handleSessionID = e => {
    setSessionID(e.target.value)
  }

  const handleDescription = e => {
    setDescription(e.target.value)
  }

  const handleMonsterType = event => {
    setMonsterType(event.target.value)
  }

  const handleTargetMonster = event => {
    if (checkAutocompleteInput(event.target.value)) {
      setTargetMonster(event.target.value)
    } else {
      handleAutocompleteErrorTrue()
    }
  }

  const handleRank = event => {
    setRank(event.target.value)
  }

  const handleAutocompleteErrorTrue = () => {
    setAutoCompleteState(true)
  }

  const handleAutocompleteErrorFalse = () => {
    setAutoCompleteState(false)
  }

  const checkAutocompleteInput = monsterName => {
    if (monsterName === "") {
      handleAutocompleteErrorTrue()
      return true
    } else if (
      !lrhrMonsters.find(({ monster }) => monster === monsterName) &&
      !mrMonsters.find(({ monster }) => monster === monsterName)
    ) {
      handleAutocompleteErrorTrue()
      return false
    } else {
      handleAutocompleteErrorFalse()
      return (
        lrhrMonsters.find(({ monster }) => monster === monsterName) ||
        mrMonsters.find(({ monster }) => monster === monsterName)
      )
    }
  }

  const checkIfEmpty = field => {
    switch (field) {
      case "sessionID":
        if (sessionID === "") {
          return profileData.session_id
        } else {
          return sessionID
        }
      case "description":
        if (description === "") {
          return profileData.description
        } else {
          return description
        }
      case "targetMonster":
        if (targetMonster === "" || autoCompleteError) {
          return profileData.target_monster
        } else {
          return targetMonster
        }
      case "monsterType":
        if (monsterType === "") {
          return profileData.monster_type
        } else {
          return monsterType
        }
      case "rank":
        if (rank === "") {
          return profileData.rank
        } else {
          return rank
        }
      default:
        throw new Error("No input found")
    }
  }

  const isLoggedIn = () => {
    if (uid === profileData.id) {
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
              {isEditing ? (
                <TextField
                  placeholder={profileData.session_id}
                  onChange={handleSessionID}
                  inputProps={{ maxLength: 12 }}
                />
              ) : (
                <Typography
                  className={classes.profileData}
                  variant="h3"
                  component={"span"}
                >
                  {profileData.session_id}
                </Typography>
              )}
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
            <Grid className={classes.leftContainer} item sm={5}>
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
               * DESCRIPTION FIELD
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
                        inputProps={{ maxLength: 250 }}
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
                          <MenuItem value={"ArchTempered"}>
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
                                checkAutocompleteInput(params.inputProps.value)
                                  ? false
                                  : true
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
            <Button component={Link} className={classes.editBtn} to={"/hub"}>
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
    editCard: (
      username,
      sessionID,
      description,
      target_monster,
      monster_type,
      rank
    ) =>
      dispatch(
        editCard(
          username,
          sessionID,
          description,
          target_monster,
          monster_type,
          rank
        )
      ),
  }
}

export default connect(null, mapDispatchToProps)(Detail)
