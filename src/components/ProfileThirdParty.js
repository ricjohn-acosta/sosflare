import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    
}))

const ProfileThirdParty = () => {
  const classes = useStyles()

  return (
    <div>
      <Grid container direction="column">
        <Grid item xs={12} sm={12}>
          <Typography variant={"h4"}>Link your account to third party platforms</Typography>
          <hr />
        </Grid>
        <Grid item xs={12} sm={12}>
          test
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfileThirdParty
