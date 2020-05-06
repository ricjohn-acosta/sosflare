import React from "react"
import { lrhrMonsters, mrMonsters } from "../utils/FireSos.js"
import { addCard } from "../store/actions/cards"
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
      padding: 0,
      width: "100vw",
      height: "80vh",
      overflowX:"hidden"
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
  test: {
    width: "150px",
  },
}))

const FireSosModalContent = ({ addCard }) => {
  const classes = useStyles()
  const [username, setUsername] = React.useState("")
  const [platform, setPlatform] = React.useState("")
  const [sessionId, setSessionId] = React.useState("")
  const [rank, setRank] = React.useState("")
  const [resetMonsters, setResetMonsters] = React.useState(false)
  const [monsterType, setMonsterType] = React.useState("")
  const [targetMonster, setTargetMonster] = React.useState("")
  const [description, setDescription] = React.useState("")

  const handleUsername = event => {
    setUsername(event.target.value)
  }

  const handlePlatform = event => {
    setPlatform(event.target.value)
  }

  const handleRank = event => {
    setRank(event.target.value)
    setResetMonsters(true)
  }

  const handleMonsterType = event => {
    setMonsterType(event.target.value)
  }

  const handleSessionId = event => {
    setSessionId(event.target.value)
  }

  const handleTargetMonster = event => {
    setTargetMonster(event.target.value)
    setResetMonsters(false)
  }

  const handleDescription = event => {
    setDescription(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    addCard(
      username,
      platform,
      sessionId,
      rank,
      monsterType,
      targetMonster,
      description
    )
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

  console.log(resetMonsters)
  return (
    <Paper className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2>SOS Details</h2>

        <Grid
          className={classes.gridContainer}
          container
          direction="column"
          spacing={5}
        >
          <Grid item sm={12}>
            {/*
            USERNAME FIELD
            */}
            <FormControl className={classes.formControl} variant="filled">
              <TextField
                className={classes.test}
                label="Username"
                placeholder="Username"
                variant="filled"
                size="small"
                onChange={handleUsername}
                inputProps={{ maxLength: 12 }}
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
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <hr />
          <Grid item sm={12}>
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
              renderInput={params => (
                <TextField
                  onSelect={handleTargetMonster}
                  {...params}
                  label="Choose monster"
                  variant="filled"
                  fullWidth
                />
              )}
            />
          </Grid>
          <hr />
          {/*
            DESCRIPTION FIELD
            */}
          <Grid item sm={12}>
            <TextField
              onChange={handleDescription}
              label="Description"
              placeholder="Let people know what you need help with!"
              variant="filled"
              fullWidth
              multiline
              rows={10}
              inputProps={{ maxLength: 350 }}
            />
          </Grid>
          <Grid item sm={12} />
        </Grid>

        {!username ||
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
          <Link to="/hub" className={classes.link}>
            <Button
              type="submit"
              onClick={() => {
                addCard(
                  username,
                  platform,
                  sessionId,
                  rank,
                  monsterType,
                  targetMonster,
                  description
                )
              }}
              fullWidth
            >
              FIRE SOS
            </Button>
          </Link>
        )}
      </form>
    </Paper>
  )
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
      description
    ) =>
      dispatch(
        addCard(
          username,
          platform,
          sessionId,
          rank,
          monsterType,
          targetMonster,
          description
        )
      ),
  }
}

export default connect(null, mapDispatchToProps)(FireSosModalContent)
