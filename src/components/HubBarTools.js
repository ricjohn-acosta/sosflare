import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import { fade, makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import Checkbox from "@material-ui/core/Checkbox"
import withWidth, { isWidthDown } from "@material-ui/core/withWidth"
import { sort, findUser } from "../store/actions/cards"

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
      marginLeft: theme.spacing(2),
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
  labels: {
    paddingLeft: "10px",
    fontSize: "15px",
    color: "#787878",
  },
  formGroup: {
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      right: "15vw",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "50px",
    },
    [theme.breakpoints.up("lg")]: {
      float: "left",
      position: "relative",
      left: "50px",
    },
  },
}))

const HubBarTools = props => {
  const classes = useStyles()
  const [sortByMonster, setCheckboxMonster] = React.useState(false)
  const [sortByNewest, setCheckboxNewest] = React.useState(false)
  const [sortByOldest, setCheckboxOldest] = React.useState(false)

  const handleCheckboxMonster = event => {
    setCheckboxMonster(event.target.checked)
    setCheckboxNewest(false)
    setCheckboxOldest(false)
    if (!sortByMonster) {
      props.sort("monster")
    } else {
      props.sort(null)
    }
  }
  const handleCheckboxNewest = event => {
    setCheckboxNewest(event.target.checked)
    setCheckboxMonster(false)
    setCheckboxOldest(false)
    if (!sortByNewest) {
      props.sort("newest")
    } else {
      props.sort(null)
    }
  }
  const handleCheckboxOldest = event => {
    setCheckboxOldest(event.target.checked)
    setCheckboxNewest(false)
    setCheckboxMonster(false)
    if (!sortByOldest) {
      props.sort("oldest")
    } else {
      props.sort(null)
    }
  }

  return (
    <>
      <div>
        {/**
         * HEADER
         */}
        <div>
          <Typography variant="h6">Search current page</Typography>
        </div>
        <hr />
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
            onChange={e => props.findUser(e.target.value)}
          />
        </div>

        {/**
         * FILTER CHECKBOXES
         */}
        <div>
          <br />
          <Typography variant="body2">Sort by:</Typography>
          <FormGroup
            className={classes.formGroup}
            row={isWidthDown("lg", props.width) ? true : false}
          >
            <FormControlLabel
              value="SORT_MONSTER"
              control={
                <Checkbox
                  checked={sortByMonster}
                  color="primary"
                  value={"test"}
                  onChange={handleCheckboxMonster}
                />
              }
              label={
                <Typography className={classes.labels}>Monster</Typography>
              }
              labelPlacement="start"
            />
            <FormControlLabel
              value="SORT_NEWEST"
              control={
                <Checkbox
                  checked={sortByNewest}
                  color="primary"
                  onChange={handleCheckboxNewest}
                />
              }
              label={<Typography className={classes.labels}>Newest</Typography>}
              labelPlacement="start"
            />
            <FormControlLabel
              value="SORT_OLDEST"
              control={
                <Checkbox
                  checked={sortByOldest}
                  color="primary"
                  onChange={handleCheckboxOldest}
                />
              }
              label={<Typography className={classes.labels}>Oldest</Typography>}
              labelPlacement="start"
            />
          </FormGroup>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    sort: type => dispatch(sort(type)),
    findUser: user => dispatch(findUser(user)),
  }
}
export default compose(
  connect(null, mapDispatchToProps),
  withWidth()
)(HubBarTools)
