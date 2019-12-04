import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Output from "./Outputs"
import Input from "./Inputs";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }
    }
  )
)

export default function Content(props) {
  const classes = useStyles()

  return (
        <Grid className={classes.root} container spacing={0}>
          <Grid item xs={9} lg={9}>
            <Output data={props.data}/>
          </Grid>
          <Grid item xs={3} lg={3}>
            <Input />
          </Grid>
        </Grid>
  )
}


