import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }}
  )
)

export default function Output() {
  const classes = useStyles()

  return (
      <div>
          These are output charts
      </div>

  )
}


