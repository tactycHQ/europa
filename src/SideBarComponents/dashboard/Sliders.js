import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import * as ssf from 'ssf'


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
            fontWeight: 'bold',
            fontSize: '1.0em',
            fontFamily: 'Roboto',
            marginTop: '0%',
            marginBottom: '5%',
            color: '#607d8b'
        },
        slider: {
            color: '#607d8b'
        },
        mark: {
            backgroundColor: '#607d8b',
            height: 8,
            width: 3,
            marginTop: -3
        },
        active: {
            backgroundColor: '#00bfa5',
            color: "#00bfa5"
        },
        markLabel: {
            fontSize: 13
        }

    }
))



function valueLabelFormat(value) {
    return ssf.format('0%',value)
}

function generateMarks(values) {
    return values.map(v => (
            {
                value: v,
                label:ssf.format('0%',v)
            }
        )
    )
}


export default function InputSlider(props) {
    const classes = useStyles()

    const marks = generateMarks(props.values)
    const min = Math.min(...props.values)
    const max = Math.max(...props.values)


    return (
        <div className={classes.root}>
            <Slider classes={{root: classes.slider, mark: classes.mark, active: classes.active, markLabel: classes.markLabel}}
                    defaultValue={props.defaultInputVal}
                    aria-labelledby="discrete-slider-restrict"
                    valueLabelDisplay="on"
                    valueLabelFormat={valueLabelFormat}
                    min={min}
                    max={max}
                    step={null}
                    marks={marks}
                    onChange={(event, value) => props.onChange(event, value, props.address)}
            />
            <div className={classes.label}>
                {props.name}
            </div>
        </div>

    )
}


