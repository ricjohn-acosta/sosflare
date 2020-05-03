import React from "react"
import { lrhrMonsters, mrMonsters, formValidation } from "../utils/FireSos.js"

import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { ButtonGroup } from "@material-ui/core"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
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

    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5, 10, 5),
      width: "80vw",
      height: "80vh",
    },
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150,
  },
}))

const FireSos = () => {
  const classes = useStyles()
  const [platform, setPlatform] = React.useState("")
  const [sessionId, setSessionId] = React.useState("")
  const [rank, setRank] = React.useState("")
  const [resetMonsters, setResetMonsters] = React.useState(false)
  const [monsterType, setMonsterType] = React.useState("")
  const [targetMonster, setTargetMonster] = React.useState("")
  const [description, setDescription] = React.useState("")

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

  const handleResetMonstersOn = event => {
    setResetMonsters(true)
  }

  const handleResetMonstersOff = event => {
    setResetMonsters(false)
  }

  const handleSubmit = () => {
    return console.log(
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
      <MenuItem value={"Normal"}>Normal</MenuItem>,
      <MenuItem value={"Tempered"}>Tempered</MenuItem>,
      <MenuItem value={"Arch Tempered"}>Arch Tempered</MenuItem>,
    ]
    return array
  }

  console.log(resetMonsters)
  return (
    <Paper className={classes.formContainer}>
      <form>
        <h2>SOS Details</h2>

        <Grid
          className={classes.gridContainer}
          container
          direction="column"
          spacing={5}
        >
          <Grid item sm={12}>
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
            <TextField
              label="Session ID"
              placeholder="Enter your current session ID"
              variant="filled"
              fullWidth
              onChange={handleSessionId}
            />
          </Grid>
          <Grid item sm={12}>
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
            <Autocomplete
              // inputValue={resetMonsters ? targetMonster : ""}
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
          <Grid item sm={12}>
            <TextField
              onChange={handleDescription}
              label="Description"
              placeholder="Let people know what you need help with!"
              variant="filled"
              fullWidth
              multiline
              rows={10}
            />
          </Grid>
          <Grid item sm={12} />
        </Grid>

        {!platform ||
        !sessionId ||
        !rank ||
        !monsterType ||
        !targetMonster ||
        !description ? (
          <Tooltip title="Please fill up the form" placement="bottom">
            <div>
              <Button disabled fullWidth>
                FIRE SOS
              </Button>
            </div>
          </Tooltip>
        ) : (
          <Button type="submit" fullWidth>
            FIRE SOS
          </Button>
        )}
      </form>
    </Paper>
  )
}

export default FireSos
