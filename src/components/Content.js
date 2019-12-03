import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Output from "./Outputs"
import Input from "./Inputs";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  outputs:{
    display:'table',
    height:'100%',
    padding:'10px'
  },
  inputs:{
    display:'table',
    height:'100%',
    padding:'10px',
    borderLeftStyle:'solid',
    borderLeftColor:'#cfd8dc',
    backgroundColor: '#cfd8dc',
    textAlign:'center'
  }
    }
  )
)

export default function Content() {
  const classes = useStyles()

  return (
        <Grid container spacing={0} direction="row">
          <Grid className={classes.outputs} item xs={9}>
            <Output/>
          </Grid>
          <Grid className={classes.inputs} item xs={3}>
            <Input/>
          </Grid>
        </Grid>
  )
}


