import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    
}))

const ProfileManageFlare = () => {
  const classes = useStyles()

  return (
    <div>
      <Grid container direction="column">
        <Grid item sm={12}>
          <Typography variant={"h4"}>Edit your flare details</Typography>
          <hr />
        </Grid>
        <Grid item sm={12}>
          test
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfileManageFlare
