import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { AppBar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"

const useStyles = makeStyles({
  appBar: {
    background: "rgb(12, 124, 177)",
  },
  login: {
    float: "right",
  },
  headerText: {
    textAlign: "center",
    textOverflow: "hidden",
    whiteSpace: "nowrap",
    margin: 0,
  },
  btnGroup: {
    float: "right",
    marginRight: "5vw",
  },
  login: {
    typography: {
      fontFamily: "Helvetica",
    },
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
})

const Header = ({ siteTitle }) => {
  const classes = useStyles()

  return (
    <header
      style={{
        background: `rgb(12, 124, 177)`,
        marginBottom: `4rem`,
      }}
    >
      <AppBar className={classes.appBar} position="static">
        <Grid container direction={"row"}>
          <Grid item sm={4} />
          <Grid item xs={6} sm={4}>
            <h1 className={classes.headerText}>
              <Link to="/" className={classes.link}>
                {siteTitle}
              </Link>
            </h1>
          </Grid>
          <Grid item xs={6} sm={4}>
            <ButtonGroup
              className={classes.btnGroup}
              size="large"
              variant="text"
            >
              <Button color="inherit">Login</Button>
              {/* <Button color="inherit">Signup</Button> */}
            </ButtonGroup>
          </Grid>
        </Grid>
      </AppBar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
