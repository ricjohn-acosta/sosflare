import React from "react"
import { logIn } from "../store/actions/auth"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import EmailIcon from "@material-ui/icons/Email"
import Typography from "@material-ui/core/Typography"
import InputAdornment from "@material-ui/core/InputAdornment"
import LockIcon from "@material-ui/icons/Lock"

const useStyles = makeStyles(theme => ({
  formContainer: {
    [theme.breakpoints.down("sm")]: {
      minHeight: "70vh",
      margin: "50px",
      padding: "60px",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "30vw",
      marginRight: "30vw",
      padding: "130px",
      minHeight: "70vh",
    },
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "50px",
  },
  inputFields: {
    minHeight: "15vh",
    float: "middle",
  },
  submitBtn: {
    width: "10vw",
  },
}))

const Login = ({ login }) => {
  const classes = useStyles()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    login(email, password)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.formContainer}>
          <Grid container direction="column" align="center">
            <div>
              <Typography className={classes.formTitle} variant="h5">
                Login to manage your account!
              </Typography>
            </div>
            <Grid className={classes.inputFields} item xs={12} sm={12}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                onChange={handleEmail}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
            <Grid className={classes.inputFields} item xs={12} sm={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                onChange={handlePassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button className={classes.submitBtn} type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(logIn(email, password)),
  }
}

export default connect(null, mapDispatchToProps)(Login)
