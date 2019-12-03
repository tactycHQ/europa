import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content:{
    padding:'1px',
    fontSize:'0.5rem',
    color:'gray',
    backgroundColor:'#eceff1',
  }}
  )
)

export default function Footer() {
  const classes = useStyles()

  return (
      <div className={classes.content}>
        Copyright © Epoch One, LLC 2019
      </div>
  )
}


