import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'



const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection:'column',
            width:'100%',
            alignItems:'center',
            padding:'20px'
        },
        label:{
            fontSize:'0.8em',
            fontFamily:'Roboto',
        },
        slider:{
            color:'#0091ea',
            thumb:'black'
        }
    }
))


function valuetext(value) {
    return `${value}`;
}


export default function InputSlider() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.label}>
                Input 1
            </div>
            <Slider className={classes.slider}
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                min={10}
                max={110}
            />
        </div>

    )
}


