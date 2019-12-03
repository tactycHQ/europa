import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }}
  )
)

export default function Input() {
  const classes = useStyles()

  return (
      <div>
          Input sliders
      </div>

  )
}


