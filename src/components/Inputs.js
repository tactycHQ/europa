import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputSlider from "./Sliders";


const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    flexDirection:'column',
    height:'92vh',
    padding:'10px',
    borderLeftStyle:'solid',
    borderLeftColor:'#cfd8dc',
    backgroundColor: '#eceff1',
    alignItems:'center'
  },
   inputText: {
      fontSize:'1em',
      fontFamily:'Roboto',
      fontWeight:'bold',
      paddingBottom:'10px'
  },
    }
  )
)

export default function Input() {
  const classes = useStyles()

  return (
      <div className={classes.root}>
          <div className={classes.inputText}>Inputs</div>
          <InputSlider/>
          <InputSlider/>
          <InputSlider/>
          <InputSlider/>
          <InputSlider/>
      </div>
  )
}


