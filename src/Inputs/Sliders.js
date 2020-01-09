import React, {useEffect, useState} from 'react'
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
            color: '#006E9F',
            textAlign:'center'
        },
        mark: {
            backgroundColor: '#C4C6C8',
            height: 6,
            width: 0.8
        },
        markActive: {
            backgroundColor: '#006E9F'
        },
        rail:{
            backgroundColor:'#767A7F'
        },
        track:{
            backgroundColor:'#006E9F'
        },
        active: {
            backgroundColor: '#A5014B'
        },
        markLabel: {
            fontSize: '0.85em',
            color:'#4F545A',
            // fontWeight:'700',
            fontFamily: 'Questrial'
        },
        markLabelActive:{
            color:'#006E9F',
            fontFamily: 'Questrial',
            // fontWeight:'600',
        },
        thumb:{
            color:'#006E9F',
            fontFamily: 'Questrial'
        },
        valueLabel:{
            color:'#006E9F',
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
    const [displayVal, setDisplayVal] = useState(0)

    const marks = generateMarks(props.values)
    const min = Math.min(...props.values)
    const max = Math.max(...props.values)

    useEffect(() => {
        setDisplayVal(props.currSliderVal)
    },[props.currSliderVal])


    return (
        <div className={classes.root}>
            <Slider classes={{
                // root: classes.slider,
                active: classes.active,
                mark: classes.mark,
                markActive:classes.markActive,
                markLabel: classes.markLabel,
                markLabelActive: classes.markLabelActive,
                thumb: classes.thumb,
                valueLabel: classes.valueLabel,
                track:classes.track,
                rail:classes.rail
            }}
                    // defaultValue={props.currSliderVal}
                    value={displayVal}
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


