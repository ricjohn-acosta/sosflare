import React from "react"
import { lrhrMonsters, mrMonsters } from "../utils/FireSos.js"
import { addCard } from "../store/actions/cards"
import { signInAnonymously } from "../store/actions/auth"
import { connect } from "react-redux"
import { Link } from "gatsby"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import InfoIcon from "@material-ui/icons/Info"
import Icon from "@material-ui/core/Icon"
import { Typography } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(theme => ({
  formContainer: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 10, 5),
    width: "30vw",
    height: "90vh",
    overflow: "auto",

    [theme.breakpoints.down("sm")]: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "20px",
      width: "100vw",
      height: "80vh",
      overflowX: "hidden",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5, 10, 5),
      width: "50vw",
      height: "80vh",
    },
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150,
  },
  link: {
    textDecoration: "none",
  },
  usernameField: {
    width: "150px",
  },
  closeButton: {
    float: "right",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100px",
  },
  fireSosBtn: {
    [theme.breakpoints.down("sm")]: {
      color: "black",
      backgroundColor: "#d6f0fd",
      overflow: "hidden",
    },

    [theme.breakpoints.up("sm")]: {
      float: "right",
      right: "5%",
      padding: "50px",
      color: "black",
      backgroundColor: "#d6f0fd",
      overflow: "hidden",
    },
  },
  hintContainer: {
    display: "flex",
    position: "relative",
    left: "10px",
    padding: "5px",
  },
  circularProgress: {
    marginLeft: "45%",
  },
}))

const FireSos = ({ addCard, isLoading, userTaken }) => {
  const classes = useStyles()
  const [username, setUsername] = React.useState("")
  const [platform, setPlatform] = React.useState("")
  const [sessionId, setSessionId] = React.useState("")
  const [rank, setRank] = React.useState("")
  // const [resetMonsters, setResetMonsters] = React.useState(false)
  const [monsterType, setMonsterType] = React.useState("")
  const [targetMonster, setTargetMonster] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [autoCompleteError, setAutoCompleteState] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleUsername = event => {
    setUsername(event.target.value)
  }

  const handlePlatform = event => {
    setPlatform(event.target.value)
  }

  const handleRank = event => {
    setRank(event.target.value)
    // setResetMonsters(true)
  }

  const handleMonsterType = event => {
    setMonsterType(event.target.value)
  }

  const handleSessionId = event => {
    setSessionId(event.target.value)
  }

  const handleTargetMonster = event => {
    if (checkAutocompleteInput(event.target.value)) {
      setTargetMonster(event.target.value)
    } else {
      handleAutocompleteErrorTrue()
    }
    // setResetMonsters(false)
  }

  const handleDescription = event => {
    setDescription(event.target.value)
  }


  const handleAutocompleteErrorTrue = () => {
    setAutoCompleteState(true)
  }

  const handleAutocompleteErrorFalse = () => {
    setAutoCompleteState(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLoading = () => {
    setLoading(true)
  }

  const handleWhitespace = () => {
    if (
      !username.replace(/\s/g, "").length ||
      !sessionId.replace(/\s/g, "").length
    ) {
      return true
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleLoading()
    addCard(
      username,
      platform,
      sessionId,
      rank,
      monsterType,
      targetMonster,
      description,
      null,
      "home"
    )
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

  const createMenuItems = () => {
    let array = [
      <MenuItem key="1" value={"Normal"}>
        Normal
      </MenuItem>,
      <MenuItem key="2" value={"Tempered"}>
        Tempered
      </MenuItem>,
      <MenuItem key="3" label={"Arch tempered"} value={"ArchTempered"}>
        Arch Tempered
      </MenuItem>,
    ]
    return array
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        className={classes.fireSosBtn}
        size="large"
        variant="outlined"
        color="primary"
        disableRipple
        fullWidth
        // disabled={!hasUserFiredSos() ? false : true}
      >
        <h3>FIRE SOS</h3>
      </Button>
      <Modal
        className={classes.modal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.formContainer}>
            <div className={classes.closeButton}>
              <IconButton
                onClick={handleClose}
                aria-label="delete"
                color="primary"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <form onSubmit={handleSubmit}>
              <h2>SOS Details</h2>

              <Grid
                className={classes.gridContainer}
                container
                direction="column"
                spacing={5}
              >
                <div className={classes.hintContainer}>
                  <Icon>
                    <InfoIcon fontSize={"small"} />
                  </Icon>
                  <Typography variant="caption">
                    Firing an SOS will automatically make you an account for
                    managing your flares!
                  </Typography>
                </div>
                <Grid item xs={12} sm={12}>
                  {/*
            USERNAME FIELD
            */}
                  <FormControl className={classes.formControl} variant="filled">
                    <TextField
                      className={classes.usernameField}
                      label="Hunter name"
                      placeholder="Username"
                      variant="filled"
                      size="small"
                      onChange={handleUsername}
                      inputProps={{ maxLength: 16 }}
                      error={userTaken ? true : false}
                      helperText={userTaken ? userTaken : null}
                    />
                    <br />
                  </FormControl>
                  &nbsp;
                  {/*
            PLATFORM FIELD
            */}
                  <FormControl
                    className={classes.formControl}
                    variant="filled"
                    size="small"
                  >
                    <InputLabel>Platform</InputLabel>
                    <Select value={platform} onChange={handlePlatform}>
                      <MenuItem value={"PC"}>PC</MenuItem>
                      <MenuItem value={"XBOX"}>XBOX</MenuItem>
                      <MenuItem value={"PS4"}>PS4</MenuItem>
                    </Select>
                    <br />
                  </FormControl>
                  {/*
            SESSION FIELD
            */}
                  <TextField
                    label="Session ID"
                    placeholder="Enter your current session ID"
                    variant="filled"
                    fullWidth
                    onChange={handleSessionId}
                    inputProps={{ maxLength: 12 }}
                  />
                </Grid>
                <hr />
                <Grid item xs={12} sm={12}>
                  {/*
            RANK FIELD
            */}
                  <FormControl
                    className={classes.formControl}
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
                  &nbsp;
                  {/*
            MONSTER TYPE FIELD
            */}
                  <FormControl
                    disabled={!rank ? true : false}
                    className={classes.formControl}
                    variant="filled"
                    size="small"
                  >
                    <InputLabel>Monster type</InputLabel>
                    <Select value={monsterType} onChange={handleMonsterType}>
                      {rank === "LR" ? (
                        <MenuItem value={"Normal"}>Normal</MenuItem>
                      ) : (
                        createMenuItems().map(item => {
                          return item
                        })
                      )}
                    </Select>
                    <br />
                  </FormControl>
                  {/*
            TARGET MONSTER FIELD
            */}
                  <Autocomplete
                    fullWidth
                    disabled={!rank || !monsterType ? true : false}
                    options={rank === "MR" ? mrMonsters : lrhrMonsters}
                    getOptionLabel={option => option.monster}
                    renderInput={params => {
                      return (
                        <TextField
                          onSelect={handleTargetMonster}
                          // onChange={() => {setTargetMonster("")}}
                          autoComplete="false"
                          {...params}
                          label="Choose monster"
                          variant="filled"
                          fullWidth
                          error={
                            checkAutocompleteInput(params.inputProps.value)
                              ? false
                              : true
                          }
                        />
                      )
                    }}
                  />
                </Grid>
                <hr />
                {/*
            DESCRIPTION FIELD
            */}
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={handleDescription}
                    label="Description"
                    placeholder="Let people know what you need help with!"
                    variant="filled"
                    fullWidth
                    multiline
                    rows={10}
                    inputProps={{ maxLength: 250 }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} />
              </Grid>
              {/**
               * FIRE SOS BUTTON
               */}
              {handleWhitespace() ||
              autoCompleteError ||
              !username ||
              !platform ||
              !sessionId ||
              !rank ||
              !monsterType ||
              !targetMonster ||
              !description ? (
                <Tooltip
                  title="Please fill up the form"
                  placement="bottom"
                  enterTouchDelay={1}
                >
                  <div>
                    <Button disabled fullWidth>
                      FIRE SOS
                    </Button>
                  </div>
                </Tooltip>
              ) : (
                <>
                  {isLoading ? (
                    <CircularProgress className={classes.circularProgress} />
                  ) : (
                    <>
                      <Button type="submit" fullWidth>
                        FIRE SOS &nbsp;{" "}
                      </Button>
                    </>
                  )}
                </>
              )}
            </form>
            {/* {handleLoading()} */}
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}

const mapStateToProps = ({ firestore, firebase, cards }) => {
  return {
    cards: firestore.data,
    uid: firebase.auth.uid,
    userTaken: cards.error,
    isLoading: cards.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCard: (
      username,
      platform,
      sessionId,
      rank,
      monsterType,
      targetMonster,
      description,
      checkIfAnon,
      source
    ) =>
      dispatch(
        addCard(
          username,
          platform,
          sessionId,
          rank,
          monsterType,
          targetMonster,
          description,
          checkIfAnon,
          source
        )
      ),

    signInAnonymously: () => dispatch(signInAnonymously()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FireSos)
