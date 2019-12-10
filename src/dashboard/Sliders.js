import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'


const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'start',
            padding: '20px',
        },
        label: {
            display: 'flex',
            alignItems:'left',
            fontSize: '1.0em',
            fontFamily: 'Roboto',
            marginTop: '0%',
            marginBottom: '5%'
        },
        slider:{
            color: '#0091ea'
        },
        mark: {
            backgroundColor: '#0091ea',
            height: 8,
            width: 1,
            marginTop: -3,
        }
    }
))


function valuetext(value) {
    return `${value}`;
}


export default function InputSlider(props) {
    const classes = useStyles()
    // const marks = {0.3:'0.3',0.6:0.6,0.9:0.9,2.0:2.0}

    return (
        <div className={classes.root}>
            <Slider classes={{root: classes.slider,mark: classes.mark}}
                    defaultValue={30}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    valueLabelFormat={x => `${x}%`}
                    color="red"
                    marks
                    step={0.3}
                    min={0.3}
                    max={1.0}
                    onChange={props.onChange}
            />
            <div className={classes.label}>
                {props.name}
            </div>
        </div>

    )
}


