import React from "react"
import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import { fade, makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import Checkbox from "@material-ui/core/Checkbox"

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    marginTop: "5px",
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  filterMonster: {
    paddingLeft: "10px",
    fontSize: "15px",
  },
  formGroup: {
    position: "relative",
    right: "50px"
  },
}))
const HubBarTools = () => {
  const classes = useStyles()

  return (
    <>
      <div>
        {/**
         * HEADER
         */}
        <div>
          <Typography variant="h6">Search tools</Typography>
        </div>

        {/**
         * SEARCH BAR
         */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search by username.."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        {/**
         * FILTER CHECKBOXES
         */}
        <div className={classes.test}>
          <br />
          <Typography variant="body2">Sort by:</Typography>
          <FormGroup className={classes.formGroup} row>
            <FormControlLabel
              value="SORT_MONSTER"
              control={<Checkbox color="primary" />}
              label={
                <Typography className={classes.filterMonster}>
                  Monster
                </Typography>
              }
              labelPlacement="start"
            />
            <FormControlLabel
              value="SORT_DATE_ASC"
              control={<Checkbox color="primary" />}
              label={
                <Typography className={classes.filterMonster}>
                  Date created (Asc)
                </Typography>
              }
              labelPlacement="start"
            />
          </FormGroup>
        </div>
      </div>
    </>
  )
}

export default HubBarTools
