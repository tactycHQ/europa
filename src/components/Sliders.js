import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'


const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            padding: '20px',
        },
        label: {
            display: 'flex',
            fontSize: '1.0em',
            fontFamily: 'Roboto',
        },
        slider: {
            color: '#0091ea'
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
            <div className={classes.label}>
                {props.name}
            </div>
            <Slider className={classes.slider}
                    defaultValue={30}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    // marks="true"
                    step={0.3}
                    min={0.3}
                    max={1.0}
                    onChange={props.onChange}
            />
        </div>

    )
}


