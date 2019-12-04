import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height:'100%',
    padding:'25px',
    overflow:'auto'
  }}
  )
)

export default function Output(props) {
  const classes = useStyles()

  return (
      <div className={classes.root}>
        {props.data}
      </div>

  )
}


