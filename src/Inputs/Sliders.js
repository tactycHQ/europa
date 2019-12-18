import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import * as ssf from 'ssf'


const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'

        },
        label: {
            display: 'flex',
            fontWeight: '650',
            fontSize: '0.9em',
            fontFamily: 'Questrial',
            marginTop: '0%',
            marginBottom: '7%',
            color: '#4B719C',
            textAlign:'center'
        },
        slider: {
            color: '#4B719C'

        },
        mark: {
            backgroundColor: '#4B719C',
            height: 6,
            width: 0.8
        },
        active: {
            backgroundColor: '#292F36'
        },
        markLabel: {
            fontSize: '0.85em',
            color:'#4B719C',
            // fontWeight:'700',
            fontFamily: 'Questrial'
        },
        markLabelActive:{
            color:'#4B719C',
            fontFamily: 'Questrial'
        },
        thumb:{
            color:'#4B719C',
            fontFamily: 'Questrial'
        },
        valueLabel:{
            color:'#4B719C',
            fontFamily: 'Questrial'
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
            <Slider classes={{
                root: classes.slider,
                mark: classes.mark,
                active: classes.active,
                markLabel: classes.markLabel,
                markLabelActive: classes.markLabelActive,
                thumb: classes.thumb,
                valueLabel: classes.valueLabel
            }}
                    defaultValue={props.defaultInputVal}
                    aria-labelledby="discrete-slider-restricted"
                    valueLabelDisplay="on"
                    valueLabelFormat={valueLabelFormat}
                    min={min}
                    max={max}
                    step={null}
                    marks={marks}
                    onChangeCommitted={(event, value) => props.onChange(event, value, props.address)}
            />
            <div className={classes.label}>
                {props.name}
            </div>
        </div>

    )
}


